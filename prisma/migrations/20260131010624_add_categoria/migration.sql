-- CreateTable
CREATE TABLE "Profile" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "full_name" TEXT,
    "avatar_url" TEXT,
    "role" TEXT NOT NULL DEFAULT 'user',
    "city" TEXT,
    "mobility_type" TEXT,
    "preferences" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Profile_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Lugar" (
    "id" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "ubicacion" TEXT NOT NULL,
    "lat" DOUBLE PRECISION,
    "lng" DOUBLE PRECISION,
    "costo" TEXT NOT NULL,
    "nivel_esfuerzo" TEXT NOT NULL,
    "movilidad" TEXT[],
    "tiene_rampa" BOOLEAN NOT NULL DEFAULT false,
    "tiene_banio" BOOLEAN NOT NULL DEFAULT false,
    "es_plano" BOOLEAN NOT NULL DEFAULT false,
    "distancia_aprox" TEXT,
    "ruido" TEXT NOT NULL,
    "tiene_sombra" BOOLEAN NOT NULL DEFAULT false,
    "pet_friendly" BOOLEAN NOT NULL DEFAULT false,
    "mejor_estacion" TEXT[],
    "notas_honestas" TEXT,
    "imagenes" TEXT[],
    "categoria" TEXT,
    "fuente" TEXT NOT NULL,
    "verificado" BOOLEAN NOT NULL DEFAULT false,
    "ultima_actualizacion" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "estacion_actual" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Lugar_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Review" (
    "id" SERIAL NOT NULL,
    "text" TEXT NOT NULL,
    "rating" INTEGER,
    "userId" TEXT NOT NULL,
    "lugarId" INTEGER NOT NULL,
    "context" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Review_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserActivity" (
    "id" SERIAL NOT NULL,
    "userId" TEXT NOT NULL,
    "lugarId" INTEGER NOT NULL,
    "type" TEXT NOT NULL,
    "timestamp" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "UserActivity_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Declaracion" (
    "id" SERIAL NOT NULL,
    "nombre_lugar" TEXT NOT NULL,
    "email_contacto" TEXT NOT NULL,
    "telefono" TEXT,
    "ubicacion" TEXT NOT NULL,
    "costo" TEXT NOT NULL,
    "nivel_esfuerzo" TEXT NOT NULL,
    "movilidad" TEXT[],
    "tiene_rampa" BOOLEAN NOT NULL DEFAULT false,
    "tiene_banio" BOOLEAN NOT NULL DEFAULT false,
    "es_plano" BOOLEAN NOT NULL DEFAULT false,
    "distancia_aprox" TEXT,
    "ruido" TEXT NOT NULL,
    "tiene_sombra" BOOLEAN NOT NULL DEFAULT false,
    "pet_friendly" BOOLEAN NOT NULL DEFAULT false,
    "mejor_estacion" TEXT[],
    "notas_adicionales" TEXT,
    "imagenes" TEXT[],
    "categoria" TEXT,
    "estado" TEXT NOT NULL DEFAULT 'pendiente',
    "userId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Declaracion_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Profile_email_key" ON "Profile"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Lugar_slug_key" ON "Lugar"("slug");

-- CreateIndex
CREATE INDEX "Lugar_slug_idx" ON "Lugar"("slug");

-- CreateIndex
CREATE INDEX "Lugar_costo_idx" ON "Lugar"("costo");

-- CreateIndex
CREATE INDEX "Lugar_nivel_esfuerzo_idx" ON "Lugar"("nivel_esfuerzo");

-- CreateIndex
CREATE INDEX "Review_lugarId_idx" ON "Review"("lugarId");

-- CreateIndex
CREATE INDEX "Review_userId_idx" ON "Review"("userId");

-- CreateIndex
CREATE INDEX "UserActivity_userId_idx" ON "UserActivity"("userId");

-- CreateIndex
CREATE INDEX "UserActivity_type_idx" ON "UserActivity"("type");

-- CreateIndex
CREATE UNIQUE INDEX "UserActivity_userId_lugarId_type_key" ON "UserActivity"("userId", "lugarId", "type");

-- CreateIndex
CREATE INDEX "Declaracion_estado_idx" ON "Declaracion"("estado");

-- CreateIndex
CREATE INDEX "Declaracion_createdAt_idx" ON "Declaracion"("createdAt");

-- AddForeignKey
ALTER TABLE "Review" ADD CONSTRAINT "Review_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Profile"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Review" ADD CONSTRAINT "Review_lugarId_fkey" FOREIGN KEY ("lugarId") REFERENCES "Lugar"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserActivity" ADD CONSTRAINT "UserActivity_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Profile"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserActivity" ADD CONSTRAINT "UserActivity_lugarId_fkey" FOREIGN KEY ("lugarId") REFERENCES "Lugar"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Declaracion" ADD CONSTRAINT "Declaracion_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Profile"("id") ON DELETE SET NULL ON UPDATE CASCADE;
