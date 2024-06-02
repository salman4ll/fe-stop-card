import KaryawanInsiden from '@/components/karyawan/PageKaryawanInsiden';
import { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
    title: 'Page Laporan Karyawan',
    description: 'Generated by create next app',
};

export default function PageLaporanKaryawan() {
    return (
        <>
            <KaryawanInsiden/>
        </>
    );
}