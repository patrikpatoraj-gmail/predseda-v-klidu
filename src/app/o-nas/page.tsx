import { Metadata } from "next";

export const metadata: Metadata = { title: "O nás" };

export default function ONasPage() {
  return (
    <div className="container-narrow py-12 prose-article max-w-none
      [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:mt-8 [&_h2]:mb-3
      [&_p]:text-ink-700 [&_p]:leading-relaxed [&_p]:my-3">
      <h1 className="text-4xl font-bold">O nás</h1>
      <p>
        <strong>Předseda v klidu</strong> je nezávislá platforma propojující SVJ a bytové
        domy se správci a profesionálními předsedy v České republice.
      </p>
      <h2>Proč jsme tu</h2>
      <p>
        SVJ a bytové domy mají často jeden základní problém — najít kvalitního správce nebo
        profi předsedu je překvapivě těžké. Většinou se vybírá z doporučení známých nebo
        Googlu. Bez transparentního porovnání cen, služeb a referencí.
      </p>
      <p>
        Naším cílem je tohle změnit. Vytváříme největší a nejdůvěryhodnější katalog správců
        SVJ v ČR, kde si SVJ může jednoduše vybrat, porovnat a oslovit více firem najednou.
      </p>
      <h2>Současný stav (MVP)</h2>
      <p>
        Aktuálně jsme ve fázi MVP testování v <strong>Praze</strong>. Spolupracujeme se
        správcovskými firmami a profi předsedy, kteří mají zkušenosti přímo s pražskými SVJ
        a bytovými domy. Po validaci pražského trhu plánujeme rozšíření do dalších krajů.
      </p>
      <h2>Nezávislost</h2>
      <p>
        Nejsme správcovská firma. Nedoporučujeme „svého“ správce — všichni mají rovné
        podmínky podle nastavených filtrů a hodnocení. Premium plán dává lepší viditelnost,
        ne lepší hodnocení.
      </p>
    </div>
  );
}
