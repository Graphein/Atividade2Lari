CREATE TABLE adotante (
  id SERIAL PRIMARY KEY,            -- ao invés de INT AUTO_INCREMENT
  nome VARCHAR(120) NOT NULL,
  cpf CHAR(11) UNIQUE,
  email VARCHAR(160) UNIQUE,
  telefone VARCHAR(30),
  password_hash TEXT,
  role TEXT DEFAULT 'USER',
  criado_em TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE TABLE animal (
  id SERIAL PRIMARY KEY,            -- idem
  nome VARCHAR(80) NOT NULL,
  especie VARCHAR(80) NOT NULL,
  raca VARCHAR(80),
  sexo CHAR(1) CHECK (sexo IN ('M','F')),
  data_nascimento DATE,
  status TEXT NOT NULL DEFAULT 'disponível'
         CHECK (status IN ('disponível','adotado','indisponível')),
  adotante_id INT NULL REFERENCES adotante(id)
                 ON UPDATE CASCADE
                 ON DELETE SET NULL,
  criado_em TIMESTAMP NOT NULL DEFAULT NOW()
);


CREATE TABLE IF NOT EXISTS adocoes (
  id SERIAL PRIMARY KEY,
  adotante_id INT NOT NULL REFERENCES adotante(id) ON DELETE CASCADE,
  animal_id   INT NOT NULL REFERENCES animal(id)   ON DELETE CASCADE,
  status TEXT DEFAULT 'INTERESSE'
    CHECK (status IN ('INTERESSE','EM_AVALIACAO','APROVADA','RECUSADA')),
  created_at TIMESTAMP DEFAULT NOW(),
  CONSTRAINT uq_adotante_animal UNIQUE (adotante_id, animal_id)
);