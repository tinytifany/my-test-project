import { NextResponse } from 'next/server';
import prisma from '../../../lib/prisma';

export async function GET(request) {
  try {
    const products = await prisma.$queryRaw`
      SELECT
        p.product_id AS id,
        p.product_name,
        p.product_brand,
        o.owner_name
      FROM products p
      JOIN products_owners po ON p.product_id = po.products_id
      JOIN owners o ON po.owners_id = o.id
      ORDER BY p.product_id
    `;
    return NextResponse.json(products, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}