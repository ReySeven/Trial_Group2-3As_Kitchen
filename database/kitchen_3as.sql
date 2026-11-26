CREATE DATABASE IF NOT EXISTS kitchen_3as
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;

USE kitchen_3as;

CREATE TABLE IF NOT EXISTS users (
  id         INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  first_name VARCHAR(60)         NOT NULL,
  last_name  VARCHAR(60)         NOT NULL,
  email      VARCHAR(191)        NOT NULL UNIQUE,
  password   VARCHAR(255)        NOT NULL,
  role       ENUM('c','a','r')   NOT NULL DEFAULT 'c',
  created_at TIMESTAMP           NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS riders (
  id         INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  user_id    INT UNSIGNED        NOT NULL UNIQUE,
  mobile     VARCHAR(20)         NOT NULL,
  status     ENUM('Active','Resigned') NOT NULL DEFAULT 'Active',
  created_at TIMESTAMP           NOT NULL DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS items (
  id          INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  name        VARCHAR(191)   NOT NULL,
  description TEXT,
  price       DECIMAL(10,2)  NOT NULL,
  cost        DECIMAL(10,2)  NOT NULL DEFAULT 0,
  available   TINYINT(1)     NOT NULL DEFAULT 1,
  image       MEDIUMTEXT,
  is_bundle   TINYINT(1)     NOT NULL DEFAULT 0,
  deleted     TINYINT(1)     NOT NULL DEFAULT 0,
  created_at  TIMESTAMP      NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS bundles (
  id          INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  name        VARCHAR(191)   NOT NULL,
  description TEXT,
  price       DECIMAL(10,2)  NOT NULL,
  available   TINYINT(1)     NOT NULL DEFAULT 1,
  image       MEDIUMTEXT,
  deleted     TINYINT(1)     NOT NULL DEFAULT 0,
  created_at  TIMESTAMP      NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS bundle_items (
  id         INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  bundle_id  INT UNSIGNED  NOT NULL,
  item_id    INT UNSIGNED  NOT NULL,
  quantity   INT UNSIGNED  NOT NULL DEFAULT 1,
  FOREIGN KEY (bundle_id) REFERENCES bundles(id) ON DELETE CASCADE,
  FOREIGN KEY (item_id)   REFERENCES items(id)
);

CREATE TABLE IF NOT EXISTS orders (
  id           INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  user_id      INT UNSIGNED       NOT NULL,
  customer_name VARCHAR(120)      NOT NULL,
  address      TEXT               NOT NULL,
  want_date    DATE               NOT NULL,
  is_rush      TINYINT(1)         NOT NULL DEFAULT 0,
  subtotal     DECIMAL(10,2)      NOT NULL,
  discount     DECIMAL(10,2)      NOT NULL DEFAULT 0,
  promo_code   VARCHAR(50)        NULL,
  delivery_fee DECIMAL(10,2)      NOT NULL DEFAULT 80,
  total        DECIMAL(10,2)      NOT NULL,
  status       ENUM('Pending','Accepted','Out for delivery','Delivered','Declined')
                                  NOT NULL DEFAULT 'Pending',
  decline_reason TEXT             NULL,
  rider_id     INT UNSIGNED       NULL,
  cash_collected TINYINT(1)       NOT NULL DEFAULT 0,
  proof_image  MEDIUMTEXT         NULL,
  created_at   TIMESTAMP          NOT NULL DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id)   REFERENCES users(id),
  FOREIGN KEY (rider_id)  REFERENCES riders(id) ON DELETE SET NULL
);

CREATE TABLE IF NOT EXISTS order_items (
  id        INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  order_id  INT UNSIGNED  NOT NULL,
  item_id   INT UNSIGNED  NOT NULL,
  quantity  INT UNSIGNED  NOT NULL DEFAULT 1,
  price     DECIMAL(10,2) NOT NULL,
  FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE,
  FOREIGN KEY (item_id)  REFERENCES items(id)
);

CREATE TABLE IF NOT EXISTS order_logs (
  id         INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  order_id   INT UNSIGNED  NOT NULL,
  note       VARCHAR(255)  NOT NULL,
  logged_at  TIMESTAMP     NOT NULL DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS promos (
  id          INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  code        VARCHAR(50)             NOT NULL UNIQUE,
  type        ENUM('%','₱')           NOT NULL DEFAULT '%',
  value       DECIMAL(10,2)           NOT NULL,
  min_order   DECIMAL(10,2)           NOT NULL DEFAULT 0,
  expires_on  DATE                    NOT NULL,
  enabled     TINYINT(1)              NOT NULL DEFAULT 1,
  usage_limit INT UNSIGNED            NULL,
  used_count  INT UNSIGNED            NOT NULL DEFAULT 0,
  once_per_user TINYINT(1)            NOT NULL DEFAULT 1,
  created_at  TIMESTAMP               NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS expenses (
  id          INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  description VARCHAR(255)  NOT NULL,
  amount      DECIMAL(10,2) NOT NULL,
  expense_date DATE          NOT NULL,
  created_at  TIMESTAMP     NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS feedback (
  id         INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  order_id   INT UNSIGNED  NOT NULL UNIQUE,
  user_id    INT UNSIGNED  NOT NULL,
  rating     TINYINT       NOT NULL CHECK (rating BETWEEN 1 AND 5),
  comment    TEXT          NULL,
  created_at TIMESTAMP     NOT NULL DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE,
  FOREIGN KEY (user_id)  REFERENCES users(id)
);