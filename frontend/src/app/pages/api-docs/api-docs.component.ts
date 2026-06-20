import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { RouterModule } from '@angular/router';

interface OpenApiSpec {
  info: { title: string; description: string; version: string };
  paths: Record<string, Record<string, OpenApiOperation>>;
}

interface OpenApiOperation {
  tags?: string[];
  operationId?: string;
  summary?: string;
}

interface ApiEndpoint {
  method: string;
  path: string;
  tag: string;
  operationId: string;
}

@Component({
  selector: 'app-api-docs',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './api-docs.component.html',
  styleUrls: ['./api-docs.component.css']
})
export class ApiDocsComponent implements OnInit {
  spec: OpenApiSpec | null = null;
  endpoints: ApiEndpoint[] = [];
  swaggerUrl = 'http://localhost:8080/swagger-ui.html';
  apiDocsUrl = 'http://localhost:8080/api-docs';
  lastSynced = '';

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.http.get<OpenApiSpec>('/openapi/openapi.json').subscribe({
      next: spec => {
        this.spec = spec;
        this.endpoints = this.parseEndpoints(spec);
        this.lastSynced = spec.info.version;
      }
    });
  }

  private parseEndpoints(spec: OpenApiSpec): ApiEndpoint[] {
    const result: ApiEndpoint[] = [];
    for (const [path, methods] of Object.entries(spec.paths)) {
      for (const [method, op] of Object.entries(methods)) {
        if (method === 'parameters') continue;
        result.push({
          method: method.toUpperCase(),
          path,
          tag: op.tags?.[0] ?? 'General',
          operationId: op.operationId ?? ''
        });
      }
    }
    return result;
  }

  getMethodClass(method: string): string {
    return 'method-' + method.toLowerCase();
  }

  get groupedEndpoints(): Record<string, ApiEndpoint[]> {
    return this.endpoints.reduce((acc, ep) => {
      (acc[ep.tag] ??= []).push(ep);
      return acc;
    }, {} as Record<string, ApiEndpoint[]>);
  }

  get tagNames(): string[] {
    return Object.keys(this.groupedEndpoints);
  }
}
