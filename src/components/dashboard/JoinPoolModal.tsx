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
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader2, Users } from "lucide-react";
import { usePools } from "@/hooks/usePools";

// Schema de validação para o código de convite
const joinPoolSchema = z.object({
  inviteCode: z.string()
    .min(6, "Código deve ter pelo menos 6 caracteres")
    .max(10, "Código muito longo")
    .regex(/^[A-Z0-9]+$/, "Código deve conter apenas letras maiúsculas e números"),
});

type JoinPoolFormData = z.infer<typeof joinPoolSchema>;

interface JoinPoolModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function JoinPoolModal({ open, onOpenChange }: JoinPoolModalProps) {
  const { joinPool, isJoiningPool } = usePools();

  const form = useForm<JoinPoolFormData>({
    resolver: zodResolver(joinPoolSchema),
    defaultValues: {
      inviteCode: "",
    },
  });

  const onSubmit = async (data: JoinPoolFormData) => {
    joinPool(data.inviteCode.toUpperCase());
    
    // Fechar modal e resetar formulário em caso de sucesso
    if (!isJoiningPool) {
      onOpenChange(false);
      form.reset();
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[400px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Users className="h-5 w-5" />
            Entrar em Bolão
          </DialogTitle>
          <DialogDescription>
            Digite o código de convite para participar de um bolão
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="inviteCode"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Código de Convite</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="Ex: ABC12345"
                      className="text-center text-lg font-mono tracking-wider"
                      {...field}
                      onChange={(e) => field.onChange(e.target.value.toUpperCase())}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={() => onOpenChange(false)}
                disabled={isJoiningPool}
              >
                Cancelar
              </Button>
              <Button type="submit" disabled={isJoiningPool}>
                {isJoiningPool && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Entrar no Bolão
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
