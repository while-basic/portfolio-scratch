interface EducationCardProps {
  school: string;
  program: string;
  status: string;
}

export function EducationCard({ school, program, status }: EducationCardProps) {
  return (
    <div className="mb-4">
      <h3 className="text-xl font-semibold text-white mb-1">{school}</h3>
      <p className="text-gray-400">{program}</p>
      <p className="text-gray-500">{status}</p>
    </div>
  );
}
