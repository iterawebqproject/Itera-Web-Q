import { Helmet } from "react-helmet-async";

const JsonLd = () => (
  <Helmet>
    <script type="application/ld+json">
      {JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Store",
        name: "Mix & Bind",
        description: "Design your own notebook. Choose cover, paper, and size to create a journal as unique as your ideas.",
        url: "https://mix-and-bind-kit.lovable.app",
        image: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/f421faeb-bcdb-415d-b9e8-5e413235d064/id-preview-0ea1677a--d9de9599-52b7-4e76-97ab-21d06b54b386.lovable.app-1775704875067.png",
        priceRange: "$16-$36",
        sameAs: [],
      })}
    </script>
  </Helmet>
);

export default JsonLd;
