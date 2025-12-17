interface SectionProps {
  title: string;
  children?: React.ReactNode;
  required?: boolean;
}

const Section = ({ title, children, required = false }: SectionProps) => {
  return (
    <div>
      <h3 className="font-semibold mb-3">
        {title} {required && <span className="text-red-500">*</span>}
      </h3>
      {children}
    </div>
  );
};

export default Section;