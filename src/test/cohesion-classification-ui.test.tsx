import {afterEach, describe, expect, it, vi} from 'vitest';
import {cleanup, fireEvent, render, screen} from '@testing-library/react';
vi.mock('@tanstack/react-router',()=>({createFileRoute:()=>()=>({}),Link:({children}:{children:React.ReactNode})=><span>{children}</span>}));
import { SynonymClassification } from '@/routes/jugar';
import { COHESION_CLASSIFICATION } from '@/lib/grammar-classify-cohesion';
afterEach(()=>{cleanup();localStorage.clear();});
describe('clasificación de cohesión',()=>{it('registra la respuesta y avanza',()=>{
 render(<SynonymClassification nivel="principiante" subtema="Cohesión y coherencia"/>);
 const q=COHESION_CLASSIFICATION.find(x=>x.level==='principiante'&&screen.queryByText(x.prompt));
 expect(q).toBeDefined();fireEvent.click(screen.getByRole('button',{name:q!.items[0].label}));fireEvent.click(screen.getByRole('button',{name:'Comprobar'}));
 expect(screen.getByText(q!.explanation)).toBeTruthy();fireEvent.click(screen.getByRole('button',{name:'Continuar'}));expect(screen.getByText('Clasificación · Pregunta 2 de 10 · Básico')).toBeTruthy();
});});
