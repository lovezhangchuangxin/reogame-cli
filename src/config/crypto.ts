import { createCipheriv, createDecipheriv, randomBytes, scryptSync } from 'node:crypto'
import { homedir } from 'node:os'
import { hostname } from 'node:os'

const ALGORITHM = 'aes-256-gcm'
const IV_LENGTH = 16

/**
 * 生成基于机器的唯一密钥
 * 使用 hostname 和 homedir 作为盐，确保密钥在当前机器上唯一
 */
function getMachineKey(): Buffer {
  const salt = `${hostname()}:${homedir()}:reogame-cli`
  return scryptSync('reogame-cli-encryption-key', salt, 32)
}

/**
 * 加密文本
 * @param text 要加密的明文
 * @returns 加密后的字符串（hex 格式）
 */
export function encrypt(text: string): string {
  if (!text) return ''

  const key = getMachineKey()
  const iv = randomBytes(IV_LENGTH)
  const cipher = createCipheriv(ALGORITHM, key, iv)

  let encrypted = cipher.update(text, 'utf8', 'hex')
  encrypted += cipher.final('hex')

  const authTag = cipher.getAuthTag()

  // 格式: iv:authTag:encrypted
  return `${iv.toString('hex')}:${authTag.toString('hex')}:${encrypted}`
}

/**
 * 解密文本
 * @param encryptedText 加密的字符串（hex 格式）
 * @returns 解密后的明文
 */
export function decrypt(encryptedText: string): string {
  if (!encryptedText) return ''

  try {
    const parts = encryptedText.split(':')
    if (parts.length !== 3) {
      // 可能是未加密的旧密码，直接返回
      return encryptedText
    }

    const [ivHex, authTagHex, encrypted] = parts
    const key = getMachineKey()
    const iv = Buffer.from(ivHex, 'hex')
    const authTag = Buffer.from(authTagHex, 'hex')

    const decipher = createDecipheriv(ALGORITHM, key, iv)
    decipher.setAuthTag(authTag)

    let decrypted = decipher.update(encrypted, 'hex', 'utf8')
    decrypted += decipher.final('utf8')

    return decrypted
  } catch {
    // 解密失败，可能是未加密的旧密码或密钥已变更
    return encryptedText
  }
}

/**
 * 检查字符串是否已加密
 */
export function isEncrypted(text: string): boolean {
  if (!text) return false
  const parts = text.split(':')
  if (parts.length !== 3) return false

  try {
    Buffer.from(parts[0], 'hex')
    Buffer.from(parts[1], 'hex')
    return true
  } catch {
    return false
  }
}
