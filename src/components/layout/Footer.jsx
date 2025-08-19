const Footer = () => {
  return (
    <footer className="border-t border-border bg-background py-4 px-6 z-1 w-full fixed bottom-0">
      <div className="flex items-center justify-between text-sm text-muted-foreground">
        <div>
          <span>ColoredStrategies 2021</span>
        </div>
        <div className="flex items-center gap-1">
          <a href="#" className="hover:text-foreground transition-colors">
            Review
          </a>
          <span>|</span>
          <a href="#" className="hover:text-foreground transition-colors">
            Purchase
          </a>
          <span>|</span>
          <a href="#" className="hover:text-foreground transition-colors">
            Docs
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
