const fs = require('fs');
let content = fs.readFileSync('src/components/ParticipantView.tsx', 'utf8');

const targetLogic = `    return (
      matchesSearch &&
      matchesStatus &&
      matchesGender &&
      matchesCategory &&
      matchesAttendanceType &&
      matchesPeriod
    );
  });`;

const newLogic = `    return (
      matchesSearch &&
      matchesStatus &&
      matchesGender &&
      matchesCategory &&
      matchesAttendanceType &&
      matchesPeriod
    );
  });

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, statusFilter, genderFilter, categoryFilter, attendanceTypeFilter, periodFilter, participants.length]);

  const totalPages = Math.max(1, Math.ceil(filteredParticipants.length / ITEMS_PER_PAGE));
  const paginatedParticipants = filteredParticipants.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);`;

if (!content.includes('const paginatedParticipants')) {
  content = content.replace(targetLogic, newLogic);
}

// Ensure the mapping uses paginatedParticipants
content = content.replace(/filteredParticipants\.map\(\(p\)/g, 'paginatedParticipants.map((p)');

fs.writeFileSync('src/components/ParticipantView.tsx', content);
