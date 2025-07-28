import { useTheme } from "next-themes"
import { Toaster as Sonner, toast } from "sonner"

type ToasterProps = React.ComponentProps<typeof Sonner>

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = "system" } = useTheme()

  return (
    <Sonner
      theme={theme as ToasterProps["theme"]}
      className="toaster group"
      toastOptions={{
        classNames: {
          toast:
            "group toast group-[.toaster]:bg-white dark:group-[.toaster]:bg-slate-800 group-[.toaster]:text-slate-900 dark:group-[.toaster]:text-slate-100 group-[.toaster]:border-slate-200 dark:group-[.toaster]:border-slate-700 group-[.toaster]:shadow-lg",
          description: "group-[.toast]:text-slate-600 dark:group-[.toast]:text-slate-400",
          actionButton:
            "group-[.toast]:bg-emerald-600 dark:group-[.toast]:bg-emerald-500 group-[.toast]:text-white",
          cancelButton:
            "group-[.toast]:bg-slate-100 dark:group-[.toast]:bg-slate-700 group-[.toast]:text-slate-600 dark:group-[.toast]:text-slate-400",
        },
      }}
      {...props}
    />
  )
}

export { Toaster, toast }
