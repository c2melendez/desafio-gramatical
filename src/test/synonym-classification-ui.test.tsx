import {afterEach, describe, expect, it, vi} from 'vitest';
import {cleanup, fireEvent, render, screen} from '@testing-library/react';
vi.mock('@tanstack/react-router',()=>({createFileRoute:()=>()=>({}),Link:({children}:{children:React.ReactNode})=><span>{children}</span>}));
import { SynonymClassification } from '@/routes/jugar';
import { SYNONYM_CLASSIFICATION } from '@/lib/grammar-classify-synonyms';
afterEach(()=>{cleanup();localStorage.clear();});
describe('clasificación de sinónimos y antónimos',()=>{
 it('permite clasificar, recibir retroalimentación y avanzar',()=>{
  render(<SynonymClassification nivel="principiante"/>);
  const q=SYNONYM_CLASSIFICATION.find(x=>x.level==='principiante' && screen.queryByText(x.prompt));
  expect(q).toBeDefined();
  fireEvent.click(screen.getByRole('button',{name:q!.items[0].label}));
  fireEvent.click(screen.getByRole('button',{name:'Comprobar'}));
  expect(screen.getByText(q!.explanation)).toBeTruthy();
  fireEvent.click(screen.getByRole('button',{name:'Continuar'}));
  expect(screen.getByText('2/10')).toBeTruthy();
 });
});
