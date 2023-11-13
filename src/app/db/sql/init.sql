SET TIME  ZONE 'UTC';

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";


CREATE TABLE IF NOT EXISTS "regions" (
    "regionId" SERIAL NOT NULL,
    "municipalTax" DECIMAL NOT NULL,
    "statalTax" DECIMAL NOT NULL,

    CONSTRAINT "region_pkey" PRIMARY KEY ("regionId")
);

CREATE TABLE IF NOT EXISTS "brands" (
    "brandId" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "logo" TEXT NOT NULL,
    CONSTRAINT "brand_pkey" PRIMARY KEY ("brandId")
);

CREATE TABLE IF NOT EXISTS "client" (
    "clientId" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phoneNumber" INTEGER NOT NULL,
    "typeUser" TEXT NOT NULL,

    CONSTRAINT "client_pkey" PRIMARY KEY ("clientId")
);

CREATE TABLE IF NOT EXISTS "products" (
    "productId" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "price" DECIMAL NOT NULL,
    "quantity" INTEGER NOT NULL,
    "discount" DECIMAL NOT NULL,
    "animalCategory" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "productType" TEXT NOT NULL,
    "brandId" FOREIGN KEY NOT NULL,
    "hasTax" BOOLEAN NOT NULL
    CONSTRAINT "product_pkey" PRIMARY KEY ("productId")
);

CREATE TABLE IF NOT EXISTS "customer" (
    "customerId" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "nit" INTEGER NOT NULL
    "regionId" FOREIGN KEY NOT NULL,

    CONSTRAINT "customer_pkey" PRIMARY KEY ("customerId")
);


CREATE TABLE IF NOT EXISTS "purchases" (
    "purchaseId" SERIAL NOT NULL,
    "totalPrice" DECIMAL NOT NULL,
    "reportDate" TIMESTAMPTZ(3) NOT NULL CURRENT_TIMESTAMP,
    "obtainedTaxes" DECIMAL NOT NULL,
    "applicationTax" DECIMAL NOT NULL,
    "deliveryTime" DECIMAL NOT NULL,
    "productId" FOREIGN KEY NOT NULL,
    "customerId" FOREIGN KEY NOT NULL,
    CONSTRAINT "purchase_pkey" PRIMARY KEY ("purchaseId")
);


CREATE OR REPLACE FUNCTION update_updatedAt()
RETURNS TRIGGER AS $$
BEGIN
    NEW."updatedAt" = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_update_office_updatedAt
BEFORE UPDATE
ON "office"
FOR EACH ROW
EXECUTE FUNCTION update_updatedAt();

CREATE TRIGGER trigger_update_admin_updatedAt
BEFORE UPDATE
ON "admin"
FOR EACH ROW
EXECUTE FUNCTION update_updatedAt();