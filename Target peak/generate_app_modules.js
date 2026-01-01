import fs from "fs";
import path from "path";

const modules = [
  { title: "TOKEN DETAILS", componentName: "TokenDetails" },
  { title: "APPLICATION ERROR", componentName: "ApplicationError" },
  { title: "STREAM", componentName: "Stream" },
  { title: "QUESTIONS ERROR", componentName: "QuestionsError" },
  { title: "JIO OFFER REPORT", componentName: "JioOfferReport" },
  { title: "SUPPORT CATEGORY", componentName: "SupportCategory" },
  { title: "SUBJECT", componentName: "Subject" },
  { title: "UNIT / CHAPTER", componentName: "UnitChapter" },
  { title: "INSTITUTE", componentName: "Institute" },
  { title: "COURSE", componentName: "Course" },
  { title: "EXAM", componentName: "Exam" },
  { title: "E-CLASSES", componentName: "EClasses" },
  { title: "QUALIFICATION", componentName: "Qualification" },
  { title: "USER", componentName: "User" },
  { title: "ROLE", componentName: "Role" },
  { title: "SANSTHA", componentName: "Sanstha" },
  { title: "ALL DATA", componentName: "AllData" },
  { title: "APP REGISTERED STUDENT", componentName: "AppRegisteredStudent" },
  { title: "PROGRESS REPORT", componentName: "ProgressReport" },
  { title: "PAID STUDENT", componentName: "PaidStudent" },
  { title: "EVENTS", componentName: "Events" },
  { title: "OMR STUDENT", componentName: "OmrStudent" },
  { title: "EXPIRED COURSE", componentName: "ExpiredCourse" },
  { title: "FAILED / PENDING PAYMENT", componentName: "FailedPayment" },
  { title: "PROMOTION SETUP", componentName: "PromotionSetup" },
];

const targetDir = path.join(process.cwd(), "src", "app", "pages", "modules");

if (!fs.existsSync(targetDir)) {
  fs.mkdirSync(targetDir, { recursive: true });
}

modules.forEach((mod) => {
  const content = `import React from 'react';

const ${mod.componentName} = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">${mod.title}</h1>
      </div>
      <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-6">
        <p className="text-muted-foreground">
          ${mod.title} module content goes here.
        </p>
      </div>
    </div>
  );
};

export default ${mod.componentName};
`;

  fs.writeFileSync(path.join(targetDir, `${mod.componentName}.tsx`), content);
  console.log(`Created ${mod.componentName}.tsx`);
});
