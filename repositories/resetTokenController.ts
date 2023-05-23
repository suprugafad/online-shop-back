import { query } from '../db';
import { QueryResult } from "pg";

const saveResetToken = async (userId: number, resetToken: string): Promise<QueryResult> => {
  const text = 'INSERT INTO reset_tokens (user_id, token) VALUES ($1, $2)';
  const values = [userId, resetToken];

  try {
    return await query(text, values);
  } catch (error) {
    throw error;
  }
};

const checkResetToken = async (userId: number, resetToken: string): Promise<boolean> => {
  const text = 'SELECT EXISTS(SELECT 1 FROM reset_tokens WHERE user_id = $1 AND token = $2)';
  const values = [userId, resetToken];

  try {
    const result = await query(text, values);
    return result.rows[0].exists;
  } catch (error) {
    throw error;
  }
};

const deleteResetToken = async (userId: number): Promise<QueryResult> => {
  const text = 'DELETE FROM reset_tokens WHERE user_id = $1';
  const values = [userId];

  try {
    return await query(text, values);
  } catch (error) {
    throw error;
  }
};

export {
  saveResetToken,
  checkResetToken,
  deleteResetToken,
};