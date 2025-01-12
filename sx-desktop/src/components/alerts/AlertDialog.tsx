import {
  AlertDialog as AlertDialogComponent,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'

interface AlertDialogProps {
  title: string
  description: string
  textButtonOpen: string
  textButtonCancel: string
  textButtonAction: string
  action: () => void
}

export default function AlertDialog(props: AlertDialogProps) {
  return (
    <AlertDialogComponent>
      <AlertDialogTrigger className="border text-sm py-1.5 px-4 rounded-lg hover:bg-white hover:text-secondary transition-all duration-200">
        {props.textButtonOpen}
      </AlertDialogTrigger>
      <AlertDialogContent className="bg-card">
        <AlertDialogHeader>
          <AlertDialogTitle>{props.title}</AlertDialogTitle>
          {props.description && (
            <AlertDialogDescription>{props.description}</AlertDialogDescription>
          )}
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className="bg-transparent hover:text-foreground">
            {props.textButtonCancel}
          </AlertDialogCancel>
          <AlertDialogAction onClick={props.action}>
            {props.textButtonAction}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialogComponent>
  )
}
