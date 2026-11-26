import pool from '../config/db.js';

const fullName = `CONCAT(first_name, ' ', last_name)`;

export const fetch = async () => {
    const [rows] = await pool.query(
        `SELECT id, first_name, last_name, ${fullName} AS name, email, role, created_at FROM users`
    );
    return rows;
}

export const findUserByEmail = async (email) => {
    const [rows] = await pool.query(
        `SELECT *, ${fullName} AS name FROM users WHERE email = ?`,
        [email]
    );
    return rows;
}

export const findUserById = async (id) => {
    const [rows] = await pool.query(
        `SELECT id, first_name, last_name, ${fullName} AS name, email, role FROM users WHERE id = ?`,
        [id]
    );
    return rows;
}

// insert
export const insert = async (user) => {
    const [result] = await pool.query(
        "INSERT INTO users (first_name, last_name, email, password, role) VALUES (?, ?, ?, ?, ?)",
        [user.first_name, user.last_name, user.email, user.password, user.role || 'c']
    );
    return result.insertId;
}

// update
export const update = async (user) => {
    const [result] = await pool.query(
        "UPDATE users SET first_name = ?, last_name = ?, email = ? WHERE id = ?",
        [user.first_name, user.last_name, user.email, user.id]
    );
    return result.affectedRows;
}

export const updatePassword = async (id, password) => {
    const [result] = await pool.query(
        "UPDATE users SET password = ? WHERE id = ?",
        [password, id]
    );
    return result.affectedRows;
}

// delete
export const remove = async (id) => {
    const [result] = await pool.query(
        "DELETE FROM users WHERE id = ?",
        [id]
    );
    return result.affectedRows;
}
