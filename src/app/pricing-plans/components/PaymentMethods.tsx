import AppImage from '@/components/ui/AppImage';

interface PaymentMethod {
  name: string;
  icon: string;
  alt: string;
}

interface PaymentMethodsProps {
  methods: PaymentMethod[];
}

const PaymentMethods = ({ methods }: PaymentMethodsProps) => {
  return (
    <div className="bg-surface rounded-xl border border-border p-6">
      <div className="text-center mb-6">
        <h3 className="text-lg font-semibold text-foreground mb-2">
          Secure Payment Methods
        </h3>
        <p className="text-sm text-text-secondary">
          We support all major payment options in India
        </p>
      </div>
      <div className="flex flex-wrap items-center justify-center gap-6">
        {methods.map((method, index) => (
          <div
            key={index}
            className="flex items-center justify-center w-16 h-16 bg-muted rounded-lg border border-border hover:border-primary/50 transition-all duration-150"
            title={method.name}
          >
            <AppImage
              src={method.icon}
              alt={method.alt}
              className="w-12 h-12 object-contain"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default PaymentMethods;