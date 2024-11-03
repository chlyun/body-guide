import axios from 'axios';
import https from 'https';
import { NextRequest, NextResponse } from 'next/server';

const agent = new https.Agent({
  rejectUnauthorized: false, // SSL certificate validation is ignored
});

export async function POST(req: NextRequest) {
  try {
    const { productId } = await req.json(); // Parse the productId from the request body
    const API_URL = `https://${process.env.SERVER_IP}/web/productClick/${productId}`; // Construct the full URL

    // Make a POST request to the external API with the parsed body
    const response = await axios.post(
      API_URL,
      {}, // No additional body content needed for the external POST
      {
        httpsAgent: agent,
      },
    );

    return NextResponse.json(response.data, { status: 200 });
  } catch (error) {
    console.error('Error posting data to the API:', error);
    return NextResponse.json(
      { message: 'Error posting data to the API' },
      { status: 500 },
    );
  }
}
