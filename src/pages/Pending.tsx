import { EmptyState } from '@/components/ui/EmptyState';
export default function Pending({ titulo, fase }: { titulo: string; fase: number }) {
  return <div className="space-y-4"><h1 className="text-2xl font-semibold">{titulo}</h1><EmptyState titulo="Disponible en una fase posterior" texto={`Este módulo se construye en la Fase ${fase}.`} /></div>;
}
