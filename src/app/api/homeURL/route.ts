import { NextRequest, NextResponse } from 'next/server';

const HOME_PAGE = `${process.env.HOME_PAGE}`;

export async function GET(req: NextRequest) {
  try {
    // HOME_PAGE 변수를 JSON 형태로 반환
    return NextResponse.json({ homePage: HOME_PAGE }, { status: 200 });
  } catch (error) {
    console.error('HOME_PAGE를 가져오는데 오류:', error);
    return NextResponse.json(
      { message: 'HOME_PAGE 불러오기 오류' },
      { status: 500 },
    );
  }
}
