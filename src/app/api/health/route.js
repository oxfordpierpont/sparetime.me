/**
 * Health Check API Endpoint
 * GET /api/health
 *
 * Used by Docker, Coolify, and monitoring tools to check if the application is healthy
 */

import { NextResponse } from 'next/server';
import { isConnected } from '@/lib/database';

export async function GET() {
  try {
    // Check if database is connected
    const dbConnected = isConnected();

    // Basic health check
    const health = {
      status: 'ok',
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
      environment: process.env.NODE_ENV,
      database: {
        connected: dbConnected,
        status: dbConnected ? 'healthy' : 'disconnected',
      },
      version: '1.0.0',
    };

    // If database is not connected, return 503
    if (!dbConnected) {
      return NextResponse.json(
        {
          ...health,
          status: 'degraded',
        },
        { status: 503 }
      );
    }

    return NextResponse.json(health, {
      status: 200,
      headers: {
        'Cache-Control': 'no-cache, no-store, must-revalidate',
      },
    });
  } catch (error) {
    return NextResponse.json(
      {
        status: 'error',
        timestamp: new Date().toISOString(),
        error: error.message,
      },
      { status: 500 }
    );
  }
}
