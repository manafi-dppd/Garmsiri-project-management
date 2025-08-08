npx prisma migrate diff `
  --from-empty `
  --to-url "postgresql://postgres@localhost:5432/garmsirisystemdb" `
  --script > "prisma/migrations/$(Get-Date -Format 'yyyyMMddHHmmss')_sync_existing_structure/migration.sql"
"@ | Out-File -FilePath "run_migration.ps1" -Encoding UTF8