/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { createClient } from '@supabase/supabase-js';
import { Product, Sauce, Order, OrderItem, OrderStatus } from '../types';

// Read keys from Vite environment variables (both prefixed and non-prefixed for safety)
const metaEnv = (import.meta as any).env || {};
const SUPABASE_URL = (metaEnv.VITE_SUPABASE_URL || metaEnv.SUPABASE_URL || '').trim();
const SUPABASE_ANON_KEY = (metaEnv.VITE_SUPABASE_ANON_KEY || metaEnv.SUPABASE_ANON_KEY || '').trim();

// Check if keys are actually configured and are not default placeholders
export const isSupabaseConfigured = 
  SUPABASE_URL !== '' && 
  SUPABASE_ANON_KEY !== '' && 
  !SUPABASE_URL.includes('your-supabase-project') &&
  !SUPABASE_ANON_KEY.includes('your-anon-public-key');

// Global tracking for schema table cache errors
export let hasSchemaError = typeof window !== 'undefined' ? localStorage.getItem('supabase_schema_error') === 'true' : false;

export function getSchemaError() {
  return hasSchemaError;
}

export function setSchemaError(val: boolean) {
  hasSchemaError = val;
  if (typeof window !== 'undefined') {
    if (val) {
      localStorage.setItem('supabase_schema_error', 'true');
    } else {
      localStorage.removeItem('supabase_schema_error');
    }
  }
}

// Lazy initialize client to prevent startup crash if keys are missing
let supabaseInstance: any = null;

export function getSupabase() {
  if (!isSupabaseConfigured) {
    return null;
  }
  if (!supabaseInstance) {
    supabaseInstance = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
  }
  return supabaseInstance;
}

// ==========================================
// MOCK DATA SEEDING (For Demo/Offline Mode)
// ==========================================

const MOCK_PRODUCTS: Product[] = [
  {
    id: 'prod-clasico',
    nombre: 'Pancho Clásico Alemán',
    descripcion: 'Salchicha tipo Frankfurt premium, chucrut casero artesanal, lluvia de papas pay crocantes y un toque de mostaza rústica.',
    precio: 4500,
    imagen: 'https://images.unsplash.com/photo-1627059313773-aa97a922319d?q=80&w=800&auto=format&fit=crop',
    disponible: true,
    destacado: true,
    categoria: 'Clásicos'
  },
  {
    id: 'prod-cheddar',
    nombre: 'Pancho Cheddar & Bacon Explosion',
    descripcion: 'Salchicha envuelta en panceta ahumada crujiente, bañada en nuestra salsa de queso cheddar fundido y verdeo picado.',
    precio: 5200,
    imagen: 'https://images.unsplash.com/photo-1619740455993-9e612b1af08a?q=80&w=800&auto=format&fit=crop',
    disponible: true,
    destacado: true,
    mas_vendido: true,
    categoria: 'Premium'
  },
  {
    id: 'prod-criollo',
    nombre: 'Pancho Criollo',
    descripcion: 'Salchicha ahumada de campo con salsa criolla fresca (morrones, cebolla morada, tomate), aderezado con alioli suave casero.',
    precio: 4800,
    imagen: 'https://images.unsplash.com/photo-1541086095922-f67314cfb1a6?q=80&w=800&auto=format&fit=crop',
    disponible: true,
    categoria: 'Especiales'
  },
  {
    id: 'prod-roquefort',
    nombre: 'Pancho Blue Cheese & Caramelized Onion',
    descripcion: 'Salchicha alemana, queso azul premium fundido y cebolla dulce caramelizada lentamente al oporto.',
    precio: 5600,
    imagen: 'https://images.unsplash.com/photo-1612240498936-65f5101365d2?q=80&w=800&auto=format&fit=crop',
    disponible: true,
    destacado: true,
    categoria: 'Premium'
  },
  {
    id: 'prod-mexican',
    nombre: 'Pancho Mexican Hot',
    descripcion: 'Salchicha picante de campo, guacamole fresco untuoso, rodajas de jalapeños en escabeche y lluvia de nachos molidos.',
    precio: 5100,
    imagen: 'https://images.unsplash.com/photo-1599599810769-bcde5a160d32?q=80&w=800&auto=format&fit=crop',
    disponible: true,
    mas_vendido: true,
    categoria: 'Especiales'
  },
  {
    id: 'prod-bbq',
    nombre: 'Pancho BBQ Ahumado',
    descripcion: 'Salchicha premium ahumada, barbacoa ahumada artesanal de la casa, queso muzzarella fundido y cebolla frita crocante.',
    precio: 4900,
    imagen: 'https://images.unsplash.com/photo-1585238342024-78d387f4a707?q=80&w=800&auto=format&fit=crop',
    disponible: true,
    categoria: 'Clásicos'
  },
  {
    id: 'prod-caprese',
    nombre: 'Pancho Caprese Gourmet',
    descripcion: 'Salchicha con hilos de muzzarella gratinada, tomates cherry confitados al romero, pesto fresco de albahaca y nueces picadas.',
    precio: 5300,
    imagen: 'https://images.unsplash.com/photo-1627059313773-aa97a922319d?q=80&w=800&auto=format&fit=crop',
    disponible: true,
    categoria: 'Premium'
  },
  {
    id: 'prod-veggie',
    nombre: 'Pancho Veggie Falafel',
    descripcion: 'Salchicha 100% a base de plantas con hummus de garbanzos, ensaladilla de repollo colorado encurtido y salsa tártara de hierbas.',
    precio: 5500,
    imagen: 'https://images.unsplash.com/photo-1541086095922-f67314cfb1a6?q=80&w=800&auto=format&fit=crop',
    disponible: true,
    categoria: 'Veggie'
  },
  {
    id: 'prod-cohete',
    nombre: 'Pancho Cohete',
    descripcion: 'Salchicha alemana gigante de alta velocidad, envuelta en panceta crocante con un picadillo de jalapeños y cebolla crujiente, bañada en cheddar fundido flambeado con mostaza picante.',
    precio: 5900,
    imagen: 'https://images.unsplash.com/photo-1541086095922-f67314cfb1a6?q=80&w=800&auto=format&fit=crop',
    disponible: true,
    destacado: true,
    mas_vendido: true,
    categoria: 'Especiales'
  }
];

const MOCK_SAUCES: Sauce[] = [
  { id: 's-1', nombre: 'Ketchup Clásico', picante: false, premium: false },
  { id: 's-2', nombre: 'Mostaza Tradicional', picante: false, premium: false },
  { id: 's-3', nombre: 'Mayonesa Casera', picante: false, premium: false },
  { id: 's-4', nombre: 'Mayonesa de Ajo Asado', picante: false, premium: false },
  { id: 's-5', nombre: 'Mayonesa de Ciboulette', picante: false, premium: false },
  { id: 's-6', nombre: 'Mayonesa Picante Sriracha', picante: true, premium: false },
  { id: 's-7', nombre: 'Barbacoa Dulce', picante: false, premium: false },
  { id: 's-8', nombre: 'Honey Mustard Premium', picante: false, premium: true },
  { id: 's-9', nombre: 'Cheddar Fundido Suave', picante: false, premium: true },
  { id: 's-10', nombre: 'Cheddar Picante Jalapeño', picante: true, premium: true },
  { id: 's-11', nombre: 'Salsa Golf Clásica', picante: false, premium: false },
  { id: 's-12', nombre: 'Salsa Criolla Tradicional', picante: false, premium: false },
  { id: 's-13', nombre: 'Alioli de la Casa', picante: false, premium: true },
  { id: 's-14', nombre: 'Sriracha Pura', picante: true, premium: true },
  { id: 's-15', nombre: 'Chipotle Ahumado', picante: true, premium: true },
  { id: 's-16', nombre: 'Jalapeños en Escabeche', picante: true, premium: true },
  { id: 's-17', nombre: 'Salsa Buffalo New York', picante: true, premium: true },
  { id: 's-18', nombre: 'Glaceado Teriyaki', picante: false, premium: true },
  { id: 's-19', nombre: 'Curry Amarillo Suave', picante: false, premium: false },
  { id: 's-20', nombre: 'Curry Picante Madras', picante: true, premium: true },
  { id: 's-21', nombre: 'Roquefort Intenso', picante: false, premium: true },
  { id: 's-22', nombre: 'Parmesano Cremoso', picante: false, premium: true },
  { id: 's-23', nombre: 'Queso Azul Suave', picante: false, premium: true },
  { id: 's-24', nombre: 'Salsa Tártara Artesanal', picante: false, premium: true },
  { id: 's-25', nombre: 'Sweet Chili Asiático', picante: true, premium: true },
  { id: 's-26', nombre: 'BBQ Ahumada al Roble', picante: false, premium: true },
  { id: 's-27', nombre: 'Salsa de Pimienta Negra', picante: true, premium: true },
  { id: 's-28', nombre: 'Salsa Verde de Tomatillo', picante: false, premium: false },
  { id: 's-29', nombre: 'Chimichurri de Campo', picante: true, premium: false },
  { id: 's-30', nombre: 'Provenzal en Aceite de Oliva', picante: false, premium: false },
  { id: 's-31', nombre: 'Salsa Secreta de la Casa', picante: false, premium: true },
  { id: 's-32', nombre: 'Pesto Fresco de Albahaca', picante: false, premium: true }
];

// Local Storage Helper Initializations
const initializeLocalStorage = () => {
  if (typeof window === 'undefined') return;
  if (!localStorage.getItem('pancheria_orders')) {
    localStorage.setItem('pancheria_orders', JSON.stringify([]));
  }
  if (!localStorage.getItem('pancheria_order_items')) {
    localStorage.setItem('pancheria_order_items', JSON.stringify([]));
  }
  if (!localStorage.getItem('pancheria_order_sauces')) {
    localStorage.setItem('pancheria_order_sauces', JSON.stringify([]));
  }
};
initializeLocalStorage();

// ==========================================
// DATA RETRIEVAL & MANIPULATION FUNCTIONS
// ==========================================

/**
 * Fetch all available gourmet products
 */
export async function getProducts(): Promise<Product[]> {
  const supabase = getSupabase();
  if (supabase) {
    try {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .order('nombre');
      if (error) throw error;
      if (data && data.length > 0) {
        setSchemaError(false);
        return data;
      }
    } catch (e: any) {
      console.warn('Error fetching products from Supabase, returning mock products instead:', e);
      if (e && (e.code === 'PGRST205' || (e.message && e.message.includes('relation') && e.message.includes('does not exist')) || (e.message && e.message.includes('schema cache')))) {
        setSchemaError(true);
      }
    }
  }
  return MOCK_PRODUCTS;
}

/**
 * Fetch all available sauces (all 32 varieties)
 */
export async function getSauces(): Promise<Sauce[]> {
  const supabase = getSupabase();
  if (supabase) {
    try {
      const { data, error } = await supabase
        .from('sauces')
        .select('*')
        .order('nombre');
      if (error) throw error;
      if (data && data.length > 0) {
        setSchemaError(false);
        return data;
      }
    } catch (e: any) {
      console.warn('Error fetching sauces from Supabase, returning mock sauces instead:', e);
      if (e && (e.code === 'PGRST205' || (e.message && e.message.includes('relation') && e.message.includes('does not exist')) || (e.message && e.message.includes('schema cache')))) {
        setSchemaError(true);
      }
    }
  }
  return MOCK_SAUCES;
}

/**
 * Creates a complete order and inserts associated order_items and selected sauces
 */
export async function createOrder(
  orderData: { cliente: string; telefono: string; direccion: string; observaciones?: string; total: number },
  items: { product: Product; cantidad: number; salsasSelected: Sauce[] }[]
): Promise<Order> {
  const supabase = getSupabase();

  if (supabase) {
    try {
      // 1. Insert order
      const { data: order, error: orderError } = await supabase
        .from('orders')
        .insert({
          cliente: orderData.cliente,
          telefono: orderData.telefono,
          direccion: orderData.direccion,
          observaciones: orderData.observaciones || '',
          total: orderData.total,
          estado: 'Pendiente'
        })
        .select()
        .single();

      if (orderError) throw orderError;

      // 2. Insert items and sauces
      for (const item of items) {
        const { data: orderItem, error: itemError } = await supabase
          .from('order_items')
          .insert({
            order_id: order.id,
            product_id: item.product.id,
            cantidad: item.cantidad
          })
          .select()
          .single();

        if (itemError) throw itemError;

        // If sauces were selected for this item, link them
        if (item.salsasSelected.length > 0) {
          const sauceLinks = item.salsasSelected.map(sauce => ({
            order_item_id: orderItem.id,
            sauce_id: sauce.id
          }));

          const { error: saucesError } = await supabase
            .from('order_sauces')
            .insert(sauceLinks);

          if (saucesError) throw saucesError;
        }
      }

      return order as Order;
    } catch (e) {
      console.error('Supabase order creation failed. Falling back to local order storage:', e);
    }
  }

  // FALLBACK: Local Storage Database Implementation
  const newOrderId = `ORD-${Math.floor(100000 + Math.random() * 900000)}`;
  const newOrder: Order = {
    id: newOrderId,
    cliente: orderData.cliente,
    telefono: orderData.telefono,
    direccion: orderData.direccion,
    observaciones: orderData.observaciones,
    total: orderData.total,
    estado: 'Pendiente',
    created_at: new Date().toISOString()
  };

  // Save order
  const orders = JSON.parse(localStorage.getItem('pancheria_orders') || '[]');
  orders.push(newOrder);
  localStorage.setItem('pancheria_orders', JSON.stringify(orders));

  // Save items and sauce linkages locally
  const localItems = JSON.parse(localStorage.getItem('pancheria_order_items') || '[]');
  const localSauces = JSON.parse(localStorage.getItem('pancheria_order_sauces') || '[]');

  items.forEach((item, index) => {
    const itemId = `item-${newOrderId}-${index}`;
    localItems.push({
      id: itemId,
      order_id: newOrderId,
      product_id: item.product.id,
      cantidad: item.cantidad
    });

    item.salsasSelected.forEach((sauce, sIndex) => {
      localSauces.push({
        id: `link-${itemId}-${sIndex}`,
        order_item_id: itemId,
        sauce_id: sauce.id
      });
    });
  });

  localStorage.setItem('pancheria_order_items', JSON.stringify(localItems));
  localStorage.setItem('pancheria_order_sauces', JSON.stringify(localSauces));

  // Trigger simulated status transitions for local offline mode to give the user a fantastic experience
  simulateOrderStatusTransitions(newOrderId);

  return newOrder;
}

/**
 * Simulates order preparation, shipping, and delivery transitions in LocalStorage mode
 */
function simulateOrderStatusTransitions(orderId: string) {
  const transitions: { status: OrderStatus; delay: number }[] = [
    { status: 'Preparando', delay: 15000 }, // after 15s
    { status: 'En camino', delay: 35000 },  // after another 20s
    { status: 'Entregado', delay: 55000 }   // after another 20s
  ];

  transitions.forEach(({ status, delay }) => {
    setTimeout(() => {
      const orders = JSON.parse(localStorage.getItem('pancheria_orders') || '[]');
      const orderIndex = orders.findIndex((o: any) => o.id === orderId);
      if (orderIndex !== -1 && orders[orderIndex].estado !== 'Cancelar' && orders[orderIndex].estado !== 'Entregado') {
        orders[orderIndex].estado = status;
        localStorage.setItem('pancheria_orders', JSON.stringify(orders));
        // Dispatch custom event to notify React components about status update
        window.dispatchEvent(new CustomEvent('order-status-update', { detail: { orderId, status } }));
      }
    }, delay);
  });
}

/**
 * Gets the current status of an order
 */
export async function getOrder(orderId: string): Promise<Order | null> {
  const supabase = getSupabase();
  if (supabase) {
    try {
      const { data, error } = await supabase
        .from('orders')
        .select('*')
        .eq('id', orderId)
        .single();
      if (error) throw error;
      if (data) return data as Order;
    } catch (e) {
      console.warn('Error fetching order from Supabase:', e);
    }
  }

  // Fallback local search
  const orders = JSON.parse(localStorage.getItem('pancheria_orders') || '[]');
  const localOrder = orders.find((o: any) => o.id === orderId);
  return localOrder || null;
}

/**
 * Updates the status of an order (e.g. Cancelling an order or moving forward)
 */
export async function updateOrderStatus(orderId: string, status: OrderStatus): Promise<boolean> {
  const supabase = getSupabase();
  if (supabase) {
    try {
      const { error } = await supabase
        .from('orders')
        .update({ estado: status })
        .eq('id', orderId);
      if (error) throw error;
      return true;
    } catch (e) {
      console.error('Error updating status in Supabase:', e);
    }
  }

  // Fallback local update
  const orders = JSON.parse(localStorage.getItem('pancheria_orders') || '[]');
  const orderIndex = orders.findIndex((o: any) => o.id === orderId);
  if (orderIndex !== -1) {
    orders[orderIndex].estado = status;
    localStorage.setItem('pancheria_orders', JSON.stringify(orders));
    window.dispatchEvent(new CustomEvent('order-status-update', { detail: { orderId, status } }));
    return true;
  }
  return false;
}

/**
 * Fetch detailed items for a given order, including their products and selected sauces
 */
export async function getOrderItems(orderId: string): Promise<OrderItem[]> {
  const supabase = getSupabase();
  if (supabase) {
    try {
      // In Supabase, we do nested queries
      const { data, error } = await supabase
        .from('order_items')
        .select(`
          id,
          order_id,
          product_id,
          cantidad,
          products (*),
          order_sauces (
            sauces (*)
          )
        `)
        .eq('order_id', orderId);

      if (error) throw error;

      if (data) {
        return data.map((item: any) => ({
          id: item.id,
          order_id: item.order_id,
          product_id: item.product_id,
          cantidad: item.cantidad,
          product: item.products,
          salsas: item.order_sauces?.map((os: any) => os.from_sauces || os.sauces).filter(Boolean) || []
        }));
      }
    } catch (e) {
      console.warn('Error fetching order items from Supabase:', e);
    }
  }

  // Fallback Local Storage
  const localItems = JSON.parse(localStorage.getItem('pancheria_order_items') || '[]');
  const localSauces = JSON.parse(localStorage.getItem('pancheria_order_sauces') || '[]');

  const orderItems = localItems.filter((item: any) => item.order_id === orderId);

  return orderItems.map((item: any) => {
    const product = MOCK_PRODUCTS.find(p => p.id === item.product_id);
    const itemSauceIds = localSauces
      .filter((sLink: any) => sLink.order_item_id === item.id)
      .map((sLink: any) => sLink.sauce_id);

    const salsas = MOCK_SAUCES.filter(s => itemSauceIds.includes(s.id));

    return {
      id: item.id,
      order_id: item.order_id,
      product_id: item.product_id,
      cantidad: item.cantidad,
      product,
      salsas
    };
  });
}
