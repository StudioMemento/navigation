# Cielo HDRI — MEMENTO TIDE

Verifica della fonte primaria: 26 ottobre 2026.

- Asset: **Belfast Sunset (Pure Sky)**, Poly Haven.
- Fonte: https://polyhaven.com/a/belfast_sunset_puresky
- Autori: Dimitrios Savva (fotografia), Greg Zaal (elaborazione), Jarod Guest (sky edits).
- Licenza: **CC0 1.0**, https://polyhaven.com/license e https://creativecommons.org/publicdomain/zero/1.0/
- La pagina primaria identifica esplicitamente l'asset come versione modificata del solo cielo. Non contiene montagne destinate a sostituire le mesh dell'ambiente TIDE.
- La licenza primaria permette utilizzo commerciale e redistribuzione degli asset; nessun acquisto effettuato.

## File consegnato

`web/environment/belfast_sunset_puresky_2k.hdr`

Radiance RGBE HDR, 2048 × 1024 pixel, 4.563.204 byte.

SHA256: `273003109CA1CFB798CE6B96E09AC8440F763D0EF0C376BBE77492613540B4A3`

Il file proviene da una copia locale già acquisita, documentata nel precedente progetto. È stato copiato integralmente nella cartella TIDE: nessun percorso o caricamento runtime dipende da Caldera. Non sono inclusi screenshot, render promozionali, logo o testi del sito Poly Haven.

## Impiego e limiti

La fonte descrive un tramonto a basso contrasto, con orizzonte caldo e luce violetto-blu: candidato coerente con l'ora blu TIDE. La scelta dell'esposizione, della rotazione e dell'intensità deve essere consolidata dal lookdev Services, mantenendo il cielo neutro e l'ambra contenuta. L'idoneità cromatica finale non è certificata dalla sola licenza.

L'HDRI è un asset statico. PMREM, rotazione sincronizzata di background/environment e velocità yaw 0,04°/s sono responsabilità del runtime; non sono effetti incorporati automaticamente in un GLB. Montagne e parallasse rimangono mesh reali separate.
