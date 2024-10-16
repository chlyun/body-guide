import { ExerciseResult } from '@/types/exercise_result';
import axios from 'axios';
import https from 'https';
import { NextRequest, NextResponse } from 'next/server';

const API_URL = `https://${process.env.SERVER_IP}/web/exercise`;

const agent = new https.Agent({
  rejectUnauthorized: false, // SSL certificate validation is ignored
});

export async function POST(req: NextRequest) {
  try {
    // Parse the request body as JSON
    const body = await req.json();

    console.log(body);

    // Make a POST request to the external API with the parsed body
    const response = await axios.post<ExerciseResult>(API_URL, body, {
      httpsAgent: agent,
    });

    return NextResponse.json(response.data, { status: 200 });
  } catch (error) {
    console.error('Error posting data to the API:', error);
    return NextResponse.json(
      { message: 'Error posting data to the API' },
      { status: 500 },
    );
  }
}
