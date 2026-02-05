'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import styles from './Header.module.css'

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className={styles.header}>
      <div className={styles.headerInner}>
        <Link href="/" className={styles.logo}>
          <Image src="/image/sures_logo.png" alt="Sures 로고" width={32} height={32} />
        </Link>

        <button
          className={styles.navToggle}
          aria-label="메뉴 열기"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

        <nav className={`${styles.navMenu} ${isMenuOpen ? styles.active : ''}`}>
          <Link href="/" onClick={() => setIsMenuOpen(false)}>
            홈
          </Link>
          <Link href="/about" onClick={() => setIsMenuOpen(false)}>
            세무사 소개
          </Link>
          <Link href="/services" onClick={() => setIsMenuOpen(false)}>
            업무 안내
          </Link>
          <Link href="/why" onClick={() => setIsMenuOpen(false)}>
            Why SURES
          </Link>
          <Link href="/contact" onClick={() => setIsMenuOpen(false)}>
            오시는 길
          </Link>
        </nav>
      </div>
    </header>
  )
}
