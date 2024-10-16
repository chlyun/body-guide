import axios from 'axios';
import https from 'https';
import { NextRequest, NextResponse } from 'next/server';

const API_URL = `https://${process.env.SERVER_IP}/web/tag`;

const agent = new https.Agent({
  rejectUnauthorized: false, // SSL 인증서 검사를 무시함
});

export async function GET(req: NextRequest) {
  try {
    const response = await axios.get<string[]>(API_URL, { httpsAgent: agent });
    return NextResponse.json(response.data, { status: 200 });
  } catch (error) {
    console.error('Error fetching tags:', error);
    return NextResponse.json(
      { message: 'Error fetching tags' },
      { status: 500 },
    );
  }
}
