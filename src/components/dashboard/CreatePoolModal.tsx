import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CalendarIcon, Loader2 } from "lucide-react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { cn } from "@/lib/utils";
import { usePools, CreatePoolData } from "@/hooks/usePools";

// Schema de validação para o formulário
const createPoolSchema = z.object({
  name: z.string().min(3, "Nome deve ter pelo menos 3 caracteres").max(100, "Nome muito longo"),
  description: z.string().max(500, "Descrição muito longa").optional(),
  max_participants: z.number().min(2, "Mínimo 2 participantes").max(1000, "Máximo 1000 participantes").optional(),
  prize_amount: z.number().min(0, "Valor deve ser positivo").optional(),
  start_date: z.date().optional(),
  end_date: z.date().optional(),
  exact_score_points: z.number().min(1, "Mínimo 1 ponto").max(10, "Máximo 10 pontos"),
  correct_winner_points: z.number().min(1, "Mínimo 1 ponto").max(10, "Máximo 10 pontos"),
  correct_draw_points: z.number().min(1, "Mínimo 1 ponto").max(10, "Máximo 10 pontos"),
}).refine((data) => {
  if (data.start_date && data.end_date) {
    return data.end_date > data.start_date;
  }
  return true;
}, {
  message: "Data de fim deve ser posterior à data de início",
  path: ["end_date"],
});

type CreatePoolFormData = z.infer<typeof createPoolSchema>;

interface CreatePoolModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function CreatePoolModal({ open, onOpenChange }: CreatePoolModalProps) {
  const { createPool, isCreatingPool } = usePools();

  const form = useForm<CreatePoolFormData>({
    resolver: zodResolver(createPoolSchema),
    defaultValues: {
      name: "",
      description: "",
      max_participants: undefined,
      prize_amount: undefined,
      start_date: undefined,
      end_date: undefined,
      exact_score_points: 3,
      correct_winner_points: 1,
      correct_draw_points: 1,
    },
  });

  const onSubmit = async (data: CreatePoolFormData) => {
    try {
      const poolData: CreatePoolData = {
        name: data.name,
        description: data.description || "",
        max_participants: data.max_participants,
        prize_amount: data.prize_amount,
        start_date: data.start_date,
        end_date: data.end_date,
        exact_score_points: data.exact_score_points,
        correct_winner_points: data.correct_winner_points,
        correct_draw_points: data.correct_draw_points,
      };

      await createPool(poolData);
      form.reset();
      onOpenChange(false);
    } catch (error) {
      console.error("Erro ao criar bolão:", error);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Criar Novo Bolão</DialogTitle>
          <DialogDescription>
            Configure seu bolão e convide seus amigos para participar
          </DialogDescription>
        </DialogHeader>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {/* Informações Básicas */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Informações Básicas</h3>
              
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nome do Bolão *</FormLabel>
                    <FormControl>
                      <Input placeholder="Ex: Copa do Mundo 2024" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Descrição</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="Descreva as regras e detalhes do seu bolão..."
                        className="resize-none"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      Opcional - Explique as regras especiais do seu bolão
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Configurações */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Configurações</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="max_participants"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Máximo de Participantes</FormLabel>
                      <FormControl>
                        <Input 
                          type="number" 
                          placeholder="Ex: 20"
                          {...field}
                          onChange={(e) => field.onChange(e.target.value ? parseInt(e.target.value) : undefined)}
                        />
                      </FormControl>
                      <FormDescription>
                        Deixe vazio para ilimitado
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="prize_amount"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Valor do Prêmio (R$)</FormLabel>
                      <FormControl>
                        <Input 
                          type="number" 
                          step="0.01"
                          placeholder="Ex: 100.00"
                          {...field}
                          onChange={(e) => field.onChange(e.target.value ? parseFloat(e.target.value) : undefined)}
                        />
                      </FormControl>
                      <FormDescription>
                        Opcional - Valor total do prêmio
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="start_date"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Data de Início</FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant="outline"
                              className={cn(
                                "w-full pl-3 text-left font-normal",
                                !field.value && "text-muted-foreground"
                              )}
                            >
                              {field.value ? (
                                format(field.value, "PPP", { locale: ptBR })
                              ) : (
                                <span>Selecione uma data</span>
                              )}
                              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={field.value}
                            onSelect={field.onChange}
                            disabled={(date) => date < new Date()}
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                      <FormDescription>
                        Quando o bolão começará
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="end_date"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Data de Fim</FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant="outline"
                              className={cn(
                                "w-full pl-3 text-left font-normal",
                                !field.value && "text-muted-foreground"
                              )}
                            >
                              {field.value ? (
                                format(field.value, "PPP", { locale: ptBR })
                              ) : (
                                <span>Selecione uma data</span>
                              )}
                              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={field.value}
                            onSelect={field.onChange}
                            disabled={(date) => date < new Date()}
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                      <FormDescription>
                        Quando o bolão terminará
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            {/* Sistema de Pontuação */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Sistema de Pontuação</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <FormField
                  control={form.control}
                  name="exact_score_points"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Placar Exato</FormLabel>
                      <FormControl>
                        <Input 
                          type="number" 
                          min="1" 
                          max="10"
                          {...field}
                          onChange={(e) => field.onChange(parseInt(e.target.value))}
                        />
                      </FormControl>
                      <FormDescription>
                        Pontos por acertar o placar
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="correct_winner_points"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Vencedor Correto</FormLabel>
                      <FormControl>
                        <Input 
                          type="number" 
                          min="1" 
                          max="10"
                          {...field}
                          onChange={(e) => field.onChange(parseInt(e.target.value))}
                        />
                      </FormControl>
                      <FormDescription>
                        Pontos por acertar o vencedor
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="correct_draw_points"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Empate Correto</FormLabel>
                      <FormControl>
                        <Input 
                          type="number" 
                          min="1" 
                          max="10"
                          {...field}
                          onChange={(e) => field.onChange(parseInt(e.target.value))}
                        />
                      </FormControl>
                      <FormDescription>
                        Pontos por acertar empate
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            <DialogFooter>
              <Button 
                type="button" 
                variant="outline" 
                onClick={() => onOpenChange(false)}
                disabled={isCreatingPool}
              >
                Cancelar
              </Button>
              <Button 
                type="submit" 
                disabled={isCreatingPool}
                className="min-w-[120px]"
              >
                {isCreatingPool ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Criando...
                  </>
                ) : (
                  "Criar Bolão"
                )}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
