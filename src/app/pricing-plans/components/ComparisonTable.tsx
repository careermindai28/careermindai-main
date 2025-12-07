import Icon from '@/components/ui/AppIcon';

interface ComparisonFeature {
  category: string;
  features: {
    name: string;
    free: string | boolean;
    starter: string | boolean;
    pro: string | boolean;
  }[];
}

interface ComparisonTableProps {
  data: ComparisonFeature[];
}

const ComparisonTable = ({ data }: ComparisonTableProps) => {
  const renderCell = (value: string | boolean) => {
    if (typeof value === 'boolean') {
      return value ? (
        <Icon
          name="CheckIcon"
          size={20}
          variant="solid"
          className="text-success mx-auto"
        />
      ) : (
        <Icon
          name="XMarkIcon"
          size={20}
          className="text-text-secondary/40 mx-auto"
        />
      );
    }
    return <span className="text-sm text-foreground">{value}</span>;
  };

  return (
    <div className="bg-surface rounded-xl border border-border overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[640px]">
          <thead>
            <tr className="bg-muted border-b border-border">
              <th className="text-left p-4 text-sm font-semibold text-foreground">
                Features
              </th>
              <th className="text-center p-4 text-sm font-semibold text-foreground">
                Free
              </th>
              <th className="text-center p-4 text-sm font-semibold text-foreground">
                Starter
              </th>
              <th className="text-center p-4 text-sm font-semibold text-primary">
                Pro
              </th>
            </tr>
          </thead>
          <tbody>
            {data.map((category, categoryIndex) => (
              <>
                <tr key={`category-${categoryIndex}`} className="bg-muted/50">
                  <td
                    colSpan={4}
                    className="p-4 text-sm font-semibold text-foreground"
                  >
                    {category.category}
                  </td>
                </tr>
                {category.features.map((feature, featureIndex) => (
                  <tr
                    key={`feature-${categoryIndex}-${featureIndex}`}
                    className="border-b border-border hover:bg-muted/30 transition-colors duration-150"
                  >
                    <td className="p-4 text-sm text-text-secondary">
                      {feature.name}
                    </td>
                    <td className="p-4 text-center">
                      {renderCell(feature.free)}
                    </td>
                    <td className="p-4 text-center">
                      {renderCell(feature.starter)}
                    </td>
                    <td className="p-4 text-center">
                      {renderCell(feature.pro)}
                    </td>
                  </tr>
                ))}
              </>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ComparisonTable;