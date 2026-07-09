const fs = require('fs');
let content = fs.readFileSync('src/App.tsx', 'utf8');

const migration = `
  useEffect(() => {
    // Migration: Add 'raporlar' tab to admins/mudur if missing in existing localstorage users
    setUsers(prevUsers => {
      let changed = false;
      const newUsers = prevUsers.map(u => {
        if ((u.role === 'admin' || u.role === 'mudur') && !u.allowedTabs.includes('raporlar' as any)) {
          changed = true;
          return { ...u, allowedTabs: [...u.allowedTabs, 'raporlar' as any] };
        }
        return u;
      });
      if (changed && currentUser && (currentUser.role === 'admin' || currentUser.role === 'mudur') && !currentUser.allowedTabs.includes('raporlar' as any)) {
         const updatedCurrentUser = newUsers.find(u => u.id === currentUser.id);
         if (updatedCurrentUser) {
            setCurrentUser(updatedCurrentUser);
            localStorage.setItem('kys_current_user', JSON.stringify(updatedCurrentUser));
         }
      }
      return changed ? newUsers : prevUsers;
    });
  }, []);
`;

const anchor = '  // Automatically sync planned & active camp periods into the camp activities (takvim)';
content = content.replace(anchor, migration + '\n' + anchor);

fs.writeFileSync('src/App.tsx', content);
