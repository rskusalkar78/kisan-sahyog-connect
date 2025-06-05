
interface SchemeSelectorProps {
  selectedScheme: string;
  onSchemeChange: (scheme: string) => void;
}

const SchemeSelector = ({ selectedScheme, onSchemeChange }: SchemeSelectorProps) => {
  return (
    <select
      value={selectedScheme}
      onChange={(e) => onSchemeChange(e.target.value)}
      className="p-2 border border-green-200 rounded-md focus:border-green-400 focus:outline-none"
    >
      <option value="PM-KISAN">PM-KISAN</option>
      <option value="FASAL-BIMA">Fasal Bima Yojana</option>
    </select>
  );
};

export default SchemeSelector;
