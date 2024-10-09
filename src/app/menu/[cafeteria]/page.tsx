"use client";

import React from 'react';
import { useParams } from 'next/navigation';

interface MenuItem {
    name: string;
    price: number;
}

async function fetchMenu(cafeteria: string): Promise<{ items: MenuItem[] }> {
    const res = await fetch(`https://api.tuapp.com/menu/${cafeteria}`);
    if (!res.ok) {
        throw new Error('Failed to fetch menu');
    }
    return res.json();
}

const MenuCafeteria: React.FC = () => {
    const { cafeteria } = useParams() as { cafeteria: string };

    const [menu, setMenu] = React.useState<{ items: MenuItem[] } | null>(null);
    const [error, setError] = React.useState<string | null>(null);

    React.useEffect(() => {
        const loadMenu = async () => {
            try {
                const menuData = await fetchMenu(cafeteria);
                setMenu(menuData);
            } catch (error) {
                setError('Error al cargar el menú');
            }
        };
        loadMenu();
    }, [cafeteria]);

    if (error) {
        return <div>{error}</div>;
    }

    if (!menu) {
        return <div>Cargando...</div>;
    }

    return (
        <div>
            <h1>Menú de {cafeteria}</h1>
            <ul>
                {menu.items.map((item, index) => (
                    <li key={index}>
                        {item.name}: {item.price}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default MenuCafeteria;
