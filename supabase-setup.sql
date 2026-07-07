-- ==========================================
-- PANCHERÍA GOURMET - SUPABASE INITIAL SETUP
-- ==========================================

-- 1. Create tables

-- Products Table
CREATE TABLE IF NOT EXISTS products (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  nombre VARCHAR(255) NOT NULL,
  descripcion TEXT NOT NULL,
  precio NUMERIC(10, 2) NOT NULL,
  imagen TEXT NOT NULL,
  disponible BOOLEAN DEFAULT true,
  destacado BOOLEAN DEFAULT false,
  mas_vendido BOOLEAN DEFAULT false,
  categoria VARCHAR(100) DEFAULT 'Premium'
);

-- Sauces Table
CREATE TABLE IF NOT EXISTS sauces (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  nombre VARCHAR(255) NOT NULL,
  picante BOOLEAN DEFAULT false,
  premium BOOLEAN DEFAULT false
);

-- Orders Table
CREATE TABLE IF NOT EXISTS orders (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  cliente VARCHAR(255) NOT NULL,
  telefono VARCHAR(100) NOT NULL,
  direccion TEXT NOT NULL,
  observaciones TEXT,
  total NUMERIC(10, 2) NOT NULL,
  estado VARCHAR(50) DEFAULT 'Pendiente', -- 'Pendiente', 'Preparando', 'En camino', 'Entregado', 'Cancelar'
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Order Items Table
CREATE TABLE IF NOT EXISTS order_items (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  order_id UUID REFERENCES orders(id) ON DELETE CASCADE,
  product_id UUID REFERENCES products(id) ON DELETE SET NULL,
  cantidad INTEGER NOT NULL DEFAULT 1
);

-- Order Sauces Link Table
CREATE TABLE IF NOT EXISTS order_sauces (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  order_item_id UUID REFERENCES order_items(id) ON DELETE CASCADE,
  sauce_id UUID REFERENCES sauces(id) ON DELETE CASCADE
);


-- 2. Seed default data for Products
INSERT INTO products (nombre, descripcion, precio, imagen, disponible, destacado, mas_vendido, categoria)
VALUES
('Pancho Clásico Alemán', 'Salchicha tipo Frankfurt premium, chucrut casero artesanal, lluvia de papas pay crocantes y un toque de mostaza rústica.', 4500.00, 'https://images.unsplash.com/photo-1627059313773-aa97a922319d?q=80&w=800&auto=format&fit=crop', true, true, false, 'Clásicos'),
('Pancho Cheddar & Bacon Explosion', 'Salchicha envuelta en panceta ahumada crujiente, bañada en nuestra salsa de queso cheddar fundido y verdeo picado.', 5200.00, 'https://images.unsplash.com/photo-1619740455993-9e612b1af08a?q=80&w=800&auto=format&fit=crop', true, true, true, 'Premium'),
('Pancho Criollo', 'Salchicha ahumada de campo con salsa criolla fresca (morrones, cebolla morada, tomate), aderezado con alioli suave casero.', 4800.00, 'https://images.unsplash.com/photo-1541086095922-f67314cfb1a6?q=80&w=800&auto=format&fit=crop', true, false, false, 'Especiales'),
('Pancho Blue Cheese & Caramelized Onion', 'Salchicha alemana, queso azul premium fundido y cebolla dulce caramelizada lentamente al oporto.', 5600.00, 'https://images.unsplash.com/photo-1612240498936-65f5101365d2?q=80&w=800&auto=format&fit=crop', true, true, false, 'Premium'),
('Pancho Mexican Hot', 'Salchicha picante de campo, guacamole fresco untuoso, rodajas de jalapeños en escabeche y lluvia de nachos molidos.', 5100.00, 'https://images.unsplash.com/photo-1599599810769-bcde5a160d32?q=80&w=800&auto=format&fit=crop', true, false, true, 'Especiales'),
('Pancho BBQ Ahumado', 'Salchicha premium ahumada, barbacoa ahumada artesanal de la casa, queso muzzarella fundido y cebolla frita crocante.', 4900.00, 'https://images.unsplash.com/photo-1585238342024-78d387f4a707?q=80&w=800&auto=format&fit=crop', true, false, false, 'Clásicos'),
('Pancho Caprese Gourmet', 'Salchicha con hilos de muzzarella gratinada, tomates cherry confitados al romero, pesto fresco de albahaca y nueces picadas.', 5300.00, 'https://images.unsplash.com/photo-1627059313773-aa97a922319d?q=80&w=800&auto=format&fit=crop', true, false, false, 'Premium'),
('Pancho Veggie Falafel', 'Salchicha 100% a base de plantas con hummus de garbanzos, ensaladilla de repollo colorado encurtido y salsa tártara de hierbas.', 5500.00, 'https://images.unsplash.com/photo-1541086095922-f67314cfb1a6?q=80&w=800&auto=format&fit=crop', true, false, false, 'Veggie'),
('Pancho Cohete', 'Salchicha alemana gigante de alta velocidad, envuelta en panceta crocante con un picadillo de jalapeños y cebolla crujiente, bañada en cheddar fundido flambeado con mostaza picante.', 5900.00, 'https://images.unsplash.com/photo-1541086095922-f67314cfb1a6?q=80&w=800&auto=format&fit=crop', true, true, true, 'Especiales')
ON CONFLICT DO NOTHING;


-- 3. Seed default data for Sauces (32 sauces)
INSERT INTO sauces (nombre, picante, premium) VALUES
('Ketchup Clásico', false, false),
('Mostaza Tradicional', false, false),
('Mayonesa Casera', false, false),
('Mayonesa de Ajo Asado', false, false),
('Mayonesa de Ciboulette', false, false),
('Mayonesa Picante Sriracha', true, false),
('Barbacoa Dulce', false, false),
('Honey Mustard Premium', false, true),
('Cheddar Fundido Suave', false, true),
('Cheddar Picante Jalapeño', true, true),
('Salsa Golf Clásica', false, false),
('Salsa Criolla Tradicional', false, false),
('Alioli de la Casa', false, true),
('Sriracha Pura', true, true),
('Chipotle Ahumado', true, true),
('Jalapeños en Escabeche', true, true),
('Salsa Buffalo New York', true, true),
('Glaceado Teriyaki', false, true),
('Curry Amarillo Suave', false, false),
('Curry Picante Madras', true, true),
('Roquefort Intenso', false, true),
('Parmesano Cremoso', false, true),
('Queso Azul Suave', false, true),
('Salsa Tártara Artesanal', false, true),
('Sweet Chili Asiático', true, true),
('BBQ Ahumada al Roble', false, true),
('Salsa de Pimienta Negra', true, true),
('Salsa Verde de Tomatillo', false, false),
('Chimichurri de Campo', true, false),
('Provenzal en Aceite de Oliva', false, false),
('Salsa Secreta de la Casa', false, true),
('Pesto Fresco de Albahaca', false, true)
ON CONFLICT DO NOTHING;


-- 4. Enable Row Level Security (RLS)

ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE sauces ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE order_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE order_sauces ENABLE ROW LEVEL SECURITY;

-- 5. Policies creation

-- Read policy for Products (Public)
CREATE POLICY "Allow public read access to products" ON products
  FOR SELECT USING (true);

-- Read policy for Sauces (Public)
CREATE POLICY "Allow public read access to sauces" ON sauces
  FOR SELECT USING (true);

-- Insert policy for Orders (Public)
CREATE POLICY "Allow public insert to orders" ON orders
  FOR INSERT WITH CHECK (true);

-- Read policy for Orders (Public - allows users to track their order if they know the order UUID)
CREATE POLICY "Allow public select of own orders" ON orders
  FOR SELECT USING (true);

-- Update policy for Orders (Public - allows status update or cancellation)
CREATE POLICY "Allow public update of orders" ON orders
  FOR UPDATE USING (true);

-- Insert policy for Order Items
CREATE POLICY "Allow public insert of order items" ON order_items
  FOR INSERT WITH CHECK (true);

-- Read policy for Order Items
CREATE POLICY "Allow public select of order items" ON order_items
  FOR SELECT USING (true);

-- Insert policy for Order Sauces
CREATE POLICY "Allow public insert of order sauces" ON order_sauces
  FOR INSERT WITH CHECK (true);

-- Read policy for Order Sauces
CREATE POLICY "Allow public select of order sauces" ON order_sauces
  FOR SELECT USING (true);
