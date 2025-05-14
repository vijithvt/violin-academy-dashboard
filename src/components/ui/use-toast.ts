
// Import directly from the toast component
import { ToastActionElement, ToastProps } from "@/components/ui/toast";
import { useToast as useToastHook } from "@radix-ui/react-toast";

// Export the hook and toast function from radix
export const useToast = () => {
  return {
    toast: (props: ToastProps) => {
      // Implementation of toast function
      const element = document.createElement("div");
      element.className = "toast-container";
      document.body.appendChild(element);
      
      const toast = document.createElement("div");
      toast.className = `toast ${props.variant || "default"}`;
      toast.textContent = props.title;
      
      if (props.description) {
        const description = document.createElement("div");
        description.className = "toast-description";
        description.textContent = props.description;
        toast.appendChild(description);
      }
      
      element.appendChild(toast);
      
      setTimeout(() => {
        element.remove();
      }, 3000);
    },
  };
};

// Export toast function directly
export const toast = (props: ToastProps) => {
  const { toast: toastFn } = useToast();
  toastFn(props);
};

// Types for the toast props
export type { ToastProps, ToastActionElement };
