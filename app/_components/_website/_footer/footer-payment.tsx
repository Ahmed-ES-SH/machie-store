import Image from "next/image";

export function FooterPayment() {
  const paymentMethods = [
    { name: "Visa", src: "https://images.pexels.com/photos/90/credit-card-visa-bank-visa-card.jpg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=1&fit=crop" },
    { name: "Mastercard", src: "https://images.pexels.com/photos/6347713/pexels-photo-6347713.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=1&fit=crop" },
    { name: "PayPal", src: "https://images.pexels.com/photos/5835456/pexels-photo-5835456.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=1&fit=crop" },
    { name: "Skrill", src: "https://images.pexels.com/photos/6634678/pexels-photo-6634678.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=1&fit=crop" },
    { name: "Maestro", src: "https://images.pexels.com/photos/210742/pexels-photo-210742.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=1&fit=crop" },
  ];

  return (
    <div className="flex items-center space-x-3">
      {paymentMethods.map((method) => (
        <div 
          key={method.name}
          className="w-10 h-6 bg-background rounded border border-border flex items-center justify-center"
          aria-label={method.name}
        >
          <Image 
            src={method.src} 
            alt={method.name} 
            width={32} 
            height={20}
            className="w-auto h-auto max-w-full max-h-full object-contain"
          />
        </div>
      ))}
    </div>
  );
}