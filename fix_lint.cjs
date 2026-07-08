const fs = require('fs');

// Fix LoginView.tsx
let login = fs.readFileSync('src/components/LoginView.tsx', 'utf8');
if (!login.includes("useRef")) {
  login = login.replace("import { useState, useEffect } from 'react';", "import { useState, useEffect, useRef } from 'react';");
  fs.writeFileSync('src/components/LoginView.tsx', login);
}

// Fix ParticipantView.tsx
let participant = fs.readFileSync('src/components/ParticipantView.tsx', 'utf8');
if (!participant.includes("import { generateWhatsAppLink")) {
  participant = participant.replace(
    "import { Participant, CampPeriod, CampCenter, SystemLog, Bungalow } from '../types';",
    "import { Participant, CampPeriod, CampCenter, SystemLog, Bungalow } from '../types';\nimport { generateWhatsAppLink, sendWhatsAppNotification } from '../utils/whatsappService';"
  );
  // Just in case the above replace failed due to formatting:
  if (!participant.includes("import { generateWhatsAppLink")) {
    participant = participant.replace(
      "import React,",
      "import { generateWhatsAppLink, sendWhatsAppNotification } from '../utils/whatsappService';\nimport React,"
    );
  }
  fs.writeFileSync('src/components/ParticipantView.tsx', participant);
}

