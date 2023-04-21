module.exports = {
  async redirects() {
    return [
      {
        source: "/cms",
        destination: "https://media.dinvinguide.se/wp-admin",
        permanent: true,
      },
      {
        source: "/dryckeslistan/recept/:path*",
        destination: "/recept/:path*",
        permanent: true,
      },
      {
        source: "/dryckeslistan/drycker/:path*",
        destination: "/drycker/:path*",
        permanent: true,
      },
      {
        source: "/feed/:path*",
        destination: "/",
        permanent: true,
      },
      {
        source: "/fredrikschelin/glogg-bast-i-test-2",
        destination: "/anders/glogg-bast-i-test",
        permanent: true,
      },
      {
        source: "/bestchampagne",
        destination: "https://bestchampagne.se",
        permanent: true,
      },
      {
        source: "/dryckeslistan/topplistor/:path*",
        destination: "/topplistor/:path*",
        permanent: true,
      },
      {
        source:
          "/fredrikschelin/lasarfraga-vilket-vin-ska-jag-matcha-till-den-fetare-sasen-bearnaise",
        destination: "/fredrikschelin/bearnaisesas-och-vin",
        permanent: true,
      },

      {
        source: "/fredrikschelin/champagne-bast-i-test-2018",
        destination: "/fredrikschelin/champagne-bast-i-test-2018-2",
        permanent: true,
      },
      {
        source:
          "/anders/sparris-och-osterrikiskt-vin-i-harlig-kombo/johann-topf-9/",
        destination: "/anders/sparris-och-osterrikiskt-vin-i-harlig-kombo",
        permanent: true,
      },
      {
        source:
          "/anders/sparris-och-osterrikiskt-vin-i-harlig-kombo/johann-topf-8/",
        destination: "/anders/sparris-och-osterrikiskt-vin-i-harlig-kombo",
        permanent: true,
      },
      {
        source:
          "/anders/sparris-och-osterrikiskt-vin-i-harlig-kombo/johann-topf-7/",
        destination: "/anders/sparris-och-osterrikiskt-vin-i-harlig-kombo",
        permanent: true,
      },
      {
        source:
          "/anders/sparris-och-osterrikiskt-vin-i-harlig-kombo/johann-topf-6/",
        destination: "/anders/sparris-och-osterrikiskt-vin-i-harlig-kombo",
        permanent: true,
      },
      {
        source:
          "/anders/sparris-och-osterrikiskt-vin-i-harlig-kombo/johann-topf-5/",
        destination: "/anders/sparris-och-osterrikiskt-vin-i-harlig-kombo",
        permanent: true,
      },
      {
        source:
          "/anders/sparris-och-osterrikiskt-vin-i-harlig-kombo/johann-topf-4/",
        destination: "/anders/sparris-och-osterrikiskt-vin-i-harlig-kombo",
        permanent: true,
      },
      {
        source:
          "/anders/sparris-och-osterrikiskt-vin-i-harlig-kombo/johann-topf-3/",
        destination: "/anders/sparris-och-osterrikiskt-vin-i-harlig-kombo",
        permanent: true,
      },
      {
        source:
          "/anders/sparris-och-osterrikiskt-vin-i-harlig-kombo/johann-topf-12/",
        destination: "/anders/sparris-och-osterrikiskt-vin-i-harlig-kombo",
        permanent: true,
      },
      {
        source:
          "/anders/sparris-och-osterrikiskt-vin-i-harlig-kombo/johann-topf-11/",
        destination: "/anders/sparris-och-osterrikiskt-vin-i-harlig-kombo",
        permanent: true,
      },
      {
        source: "/alla-recept",
        destination: "/recept",
        permanent: true,
      },
      {
        source: "/alla-drycker",
        destination: "/dryckesutforskaren",
        permanent: true,
      },
      {
        source: "/alla-druvor",
        destination: "/dryckeslistan",
        permanent: true,
      },
      {
        source: "/all",
        destination: "/recept",
        permanent: true,
      },
      {
        source: "/all/:path*",
        destination: "/sok",
        permanent: true,
      },
      {
        source: "/undefined",
        destination: "/",
        permanent: true,
      },
      {
        source:
          "/nordefors/2012/01/31/biff-med-jordartskockspure-och-brynt-lojromssmor",
        destination: "/recept/biff-med-jordartskockspure-och-brynt-lojromssmor",
        permanent: true,
      },
      {
        source:
          "/blog/recept/brodsallad-med-helgrillad-kyckling-och-chorizosmor/olympus-digital-camera-16",
        destination:
          "/recept/brodsallad-med-helgrillad-kyckling-och-chorizosmor",
        permanent: true,
      },
      {
        source:
          "/blog/recept/kryddsmor-med-rokt-marg-potatissuffle-och-oxfile/karoline-nordefors-nordefors-com-3",
        destination: "/recept/kryddsmor-med-rokt-marg-potatissuffle-och-oxfile",
        permanent: true,
      },
      {
        source:
          "/nordefors/2013/12/20/gubbrora-med-matjessill-apple-och-agg-pa-hembakat-knackebrod",
        destination:
          "/nordefors/gubbrora-med-matjessill-apple-och-agg-pa-hembakat-knackebrod",
        permanent: true,
      },
      {
        source:
          "/recept-och-vintips-till-kokbokshyllan/willi-schaefer-graacher-domprobst-riesling-spatlese-nr-90215",
        destination: "/fredrikschelin/recept-och-vintips-till-kokbokshyllan",
        permanent: true,
      },
      {
        source:
          "/blog/recept/jerkkyckling-sotpotatissallad-med-mangovinegrette/jerkkyckling",
        destination: "/blog/jerkkyckling-sotpotatissallad-med-mangovinegrette",
        permanent: true,
      },
      {
        source:
          "/blog/vin-tv/cartlidge-browne-pinot-noir-les-lauzeraies-tavel-brundlmayer-gruner-veltliner-kamptaler-terrassen-provning",
        destination: "/vin-tv",
        permanent: true,
      },
      {
        source: "/blog/vin-tv/jens-dahlberg",
        destination: "/vin-tv",
        permanent: true,
      },
      {
        source: "/blog/vin-tv/24628",
        destination: "/vin-tv",
        permanent: true,
      },
      {
        source: "/blog/vin-tv/besok-hos-weingut-karp-schreiber",
        destination: "/vin-tv",
        permanent: true,
      },
      {
        source:
          "/fredrikschelin/den-perfekta-chokladmoussen/mousse-ck-1536706-l",
        destination: "/fredrikschelin/den-perfekta-chokladmoussen",
        permanent: true,
      },
      {
        source:
          "/nordefors/2014/02/20/kockens-tips-fran-tomas-lindh-kolapaj-med-hallonsorbet",
        destination:
          "/nordefors/kockens-tips-fran-tomas-lindh-kolapaj-med-hallonsorbet",
        permanent: true,
      },

      {
        source: "/blog/vin-tv/cocktail-fat-tuesday-med-svante-schon",
        destination:
          "/nordefors/cocktailfilm-med-svante-garsten-schon-fat-tuesday-med-southern-comfort-paychaud-bitter-honung-och-kryddor",
        permanent: true,
      },

      {
        source: "/anetterosvall/visst-var-det-var-lange-sedan",
        destination: "/",
        permanent: true,
      },

      {
        source: "/choucroute-med-mousserande-vin/riesling-hugel-nr-12191-2",
        destination: "/fredrikschelin/choucroute-med-mousserande-vin",
        permanent: true,
      },
      {
        source: "/den-basta-chokladmoussen-recept-och-dryckestips-har",
        destination:
          "/fredrikschelin/den-basta-chokladmoussen-recept-och-dryckestips-har",
        permanent: true,
      },
      {
        source:
          "/nordefors/2013/12/30/chokladkolapaj-med-farska-bar-och-gradde",
        destination: "/nordefors/chokladkolapaj-med-farska-bar-och-gradde",
        permanent: true,
      },
      {
        source:
          "/nordefors/2014/03/22/cocktailfilm-med-mattias-borg-fran-marie-laveau-the-fizz-no-10-med-tanqueray-no-ten-aprikoslikor-och-peychaud-bitter",
        destination:
          "/nordefors/cocktailfilm-med-mattias-borg-fran-marie-laveau-the-fizz-no-10-med-tanqueray-no-ten-aprikoslikor-och-peychaud-bitter",
        permanent: true,
      },
      {
        source:
          "/nordefors/2013/03/28/smor-med-rokt-marg-potatissuffle-och-oxfile-vintips",
        destination:
          "/nordefors/smor-med-rokt-marg-potatissuffle-och-oxfile-vintips",
        permanent: true,
      },
      {
        source:
          "/hwar-fjortonde-dag/barna-hedenhos-upptacker-vin/barna-hedenhos",
        destination: "/magnus/barna-hedenhos-upptacker-vin",
        permanent: true,
      },
      {
        source:
          "/nordefors/2013/06/23/blinier-med-nasslor-kalixlojrom-graddfil-och-graslok-2",
        destination:
          "/nordefors/blinier-med-nasslor-kalixlojrom-graddfil-och-graslok-2",
        permanent: true,
      },
      {
        source: "/hwar-fjortonde-dag",
        destination: "/",
        permanent: true,
      },
      {
        source: "/category/jan-loov",
        destination: "/nordefors/jan-loov-kock-pa-omni-hotel-i-dallas-usa",
        permanent: true,
      },
      {
        source:
          "/hwar-fjortonde-dag/barna-hedenhos-upptacker-vin/neolitiska-karl-tbilisi-historic-museum",
        destination: "/magnus/barna-hedenhos-upptacker-vin",
        permanent: true,
      },
      {
        source:
          "/blog/recept/hamburgare-med-hogrevsfars-och-bacon-chipotlemajonnas-halloumi-och-tomatsalsa-6-port/olympus-digital-camera-15",
        destination:
          "/recept/hamburgare-med-hogrevsfars-och-bacon-chipotlemajonnas-halloumi-och-tomatsalsa",
        permanent: true,
      },
      {
        source: "/colares-portugal",
        destination: "/magnus/portugals-port-mot-vaster-colares",
        permanent: true,
      },
      {
        source:
          "/choucroute-med-mousserande-vin/dopff-brut-cuvee-julien-nr-7410-2",
        destination: "/fredrikschelin/choucroute-med-mousserande-vin",
        permanent: true,
      },
      {
        source:
          "/hwar-fjortonde-dag/barna-hedenhos-upptacker-vin/alaverdi-monastery-cellar-rkatsiteli-2010-glass",
        destination: "/magnus/barna-hedenhos-upptacker-vin",
        permanent: true,
      },

      {
        source:
          "/blog/recept/jerkkyckling-sotpotatissallad-med-mangovinegrette/lucas-lewellen-pinot-noir-nr-92038",
        destination:
          "/nordefors/jerkkyckling-sotpotatissallad-med-mangovinegrette",
        permanent: true,
      },
      {
        source: "/blog/vin-tv/mattias-skoog",
        destination: "/vin-tv",
        permanent: true,
      },
      {
        source: "/category/per-backstrom",
        destination: "/",
        permanent: true,
      },
      {
        source:
          "/sofiaander/sofias-tips-tillfalligt-sortiment-24-augusti-2021sofias-tips-tillfalligt-sortiment-24-augusti-2021",
        destination: "/",
        permanent: true,
      },
      {
        source:
          "/blog/recept/hamburgare-med-hogrevsfars-och-bacon-chipotlemajonnas-halloumi-och-tomatsalsa-6-port/olympus-digital-camera-15",
        destination:
          "/nordefors/hamburgare-med-hogrevsfars-och-bacon-chipotlemajonnas-halloumi-och-tomatsalsa-6-port",
        permanent: true,
      },
      {
        source:
          "/nordefors/2012/04/05/potatiscreme-pa-sked-med-lojrom-och-dill",
        destination: "/nordefors/potatiscreme-pa-sked-med-lojrom-och-dill",
        permanent: true,
      },
      {
        source:
          "/hwar-fjortonde-dag/barna-hedenhos-upptacker-vin/alaverdi-monastery-cellar-rkatsiteli-2010-glass",
        destination: "/magnus/barna-hedenhos-upptacker-vin",
        permanent: true,
      },
      {
        source:
          "/blog/recept/jerkkyckling-sotpotatissallad-med-mangovinegrette/lucas-lewellen-pinot-noir-nr-92038",
        destination:
          "/nordefors/jerkkyckling-sotpotatissallad-med-mangovinegrette",
        permanent: true,
      },
      {
        source:
          "/nordefors/2012/04/05/potatiscreme-pa-sked-med-lojrom-och-dill",
        destination: "/nordefors/potatiscreme-pa-sked-med-lojrom-och-dill",
        permanent: true,
      },
      {
        source:
          "/hwar-fjortonde-dag/barna-hedenhos-upptacker-vin/alaverdi-monastery-cellar-rkatsiteli-2010-glass",
        destination: "/magnus/barna-hedenhos-upptacker-vin",
        permanent: true,
      },
      {
        source:
          "/blog/recept/jerkkyckling-sotpotatissallad-med-mangovinegrette/lucas-lewellen-pinot-noir-nr-92038",
        destination:
          "/nordefors/jerkkyckling-sotpotatissallad-med-mangovinegrette",
        permanent: true,
      },
      {
        source:
          "/nordefors/2014/05/28/vill-du-jobba-som-vininspirator-och-tillverka-ditt-eget-vin-barone-ricasoli-letar-efter-dig",
        destination:
          "/nordefors/vill-du-jobba-som-vininspirator-och-tillverka-ditt-eget-vin-barone-ricasoli-letar-efter-dig",
        permanent: true,
      },

      {
        source: "/rysk-champagne",
        destination: "/fredrikschelin/rysk-champagne-2",
        permanent: true,
      },

      {
        source:
          "/nordefors/2014/01/13/mattias-skoog-bartender-linje-tio-tavlar-i-den-nordiska-finalen-av-bacardi-legacy",
        destination:
          "/nordefors/mattias-skoog-bartender-linje-tio-tavlar-i-den-nordiska-finalen-av-bacardi-legacy",
        permanent: true,
      },

      {
        source:
          "/nordefors/2014/08/30/sidecar-by-merlet-cocktail-competition-2014-swedish-qualifications-2-september",
        destination:
          "/nordefors/sidecar-by-merlet-cocktail-competition-2014-swedish-qualifications-2-september",
        permanent: true,
      },
      {
        source:
          "/nordefors/2014/06/25/kockens-tips-fran-johan-andersson-dessert-med-citronmousse-hallonpannacotta-citroncrunch-fladermarang-och-sno-pa-brynt-smor",
        destination:
          "/nordefors/kockens-tips-fran-johan-andersson-dessert-med-citronmousse-hallonpannacotta-citroncrunch-fladermarang-och-sno-pa-brynt-smor",
        permanent: true,
      },
      {
        source: "/champagne-kunskap-ger-mersmak",
        destination:
          "/nordefors/gourmand-world-cookbook-awards-2013-paris-intervju-med-finalisten-andreas-kjorling",
        permanent: true,
      },
      {
        source:
          "/nordefors/2012/11/08/parondessert-av-arets-konditor-2012-cecilia-andersson",
        destination:
          "/nordefors/parondessert-av-arets-konditor-2012-cecilia-andersson",
        permanent: true,
      },
      {
        source: "/annaantonia",
        destination: "/",
        permanent: true,
      },
      {
        source:
          "/hwar-fjortonde-dag/barna-hedenhos-upptacker-vin/forhistorisk-oljelampa-med-vinranka-tbilisi-historic-museum",
        destination: "/magnus/barna-hedenhos-upptacker-vin",
        permanent: true,
      },
      {
        source:
          "/hwar-fjortonde-dag/barna-hedenhos-upptacker-vin/alaverdi-monastery",
        destination: "/magnus/barna-hedenhos-upptacker-vin",
        permanent: true,
      },
      {
        source: "/kjorlingwine/boschendal-cap-classique",
        destination: "/fredrikschelin/cap-classique-3",
        permanent: true,
      },
      {
        source:
          "/nordefors/2014/08/24/i-baren-med-andreas-nilsson-simpelt-nyskapande-och-ateranvandningsbart-med-champagne-syrup-och-lemon-cordial",
        destination:
          "/nordefors/i-baren-med-andreas-nilsson-simpelt-nyskapande-och-ateranvandningsbart-med-champagne-syrup-och-lemon-cordial",
        permanent: true,
      },
      {
        source:
          "/nordefors/2012/06/04/gratinerad-pilgrimsmussla-med-ingefara-och-forellrom",
        destination:
          "/nordefors/gratinerad-pilgrimsmussla-med-ingefara-och-forellrom",
        permanent: true,
      },
      {
        source:
          "/anders/sparris-och-osterrikiskt-vin-i-harlig-kombo/johann-topf-8",
        destination: "/anders/sparris-och-osterrikiskt-vin-i-harlig-kombo",
        permanent: true,
      },
      {
        source:
          "/anders/sparris-och-osterrikiskt-vin-i-harlig-kombo/johann-topf-5",
        destination: "/anders/sparris-och-osterrikiskt-vin-i-harlig-kombo",
        permanent: true,
      },
      {
        source:
          "/nordefors/2013/06/19/lerpottasill-varm-sill-med-brynt-smor-dill-graslok-rodlok-och-agg",
        destination:
          "/nordefors/lerpottasill-varm-sill-med-brynt-smor-dill-graslok-rodlok-och-agg",
        permanent: true,
      },
      {
        source:
          "/recept-och-vintips-till-kokbokshyllan/pierre-sparr-pinot-gris-reserve-nr-2190",
        destination: "/fredrikschelin/recept-och-vintips-till-kokbokshyllan",
        permanent: true,
      },
      {
        source:
          "/hwar-fjortonde-dag/barna-hedenhos-upptacker-vin/anvanda-qvevri",
        destination: "/magnus/barna-hedenhos-upptacker-vin",
        permanent: true,
      },
      {
        source: "/vinlanderna-libanon-israel-och-nordafrika",
        destination:
          "/fredrikschelin/vinlanderna-libanon-israel-och-nordafrika",
        permanent: true,
      },
      {
        source: "/kategorier/kockens-tips",
        destination: "/recept",
        permanent: true,
      },
      {
        source:
          "/anders/sparris-och-osterrikiskt-vin-i-harlig-kombo/johann-topf-12",
        destination: "/anders/sparris-och-osterrikiskt-vin-i-harlig-kombo",
        permanent: true,
      },
      {
        source:
          "/anders/sparris-och-osterrikiskt-vin-i-harlig-kombo/johann-topf-4",
        destination: "/anders/sparris-och-osterrikiskt-vin-i-harlig-kombo",
        permanent: true,
      },

      {
        source:
          "/nordefors/2014/07/30/kockens-tips-fran-fredrik-gustafsson-omvand-cheesecake-med-blabar-farskostskum-och-limeglass",
        destination:
          "/nordefors/kockens-tips-fran-fredrik-gustafsson-omvand-cheesecake-med-blabar-farskostskum-och-limeglass",
        permanent: true,
      },
      {
        source:
          "/nordefors/2014/02/12/mattias-skoog-ar-den-svenska-vinnaren-i-bacardi-legacy-cocktail-competition",
        destination:
          "/nordefors/mattias-skoog-ar-den-svenska-vinnaren-i-bacardi-legacy-cocktail-competition",
        permanent: true,
      },
      {
        source:
          "/anders/sparris-och-osterrikiskt-vin-i-harlig-kombo/johann-topf-3",
        destination: "/anders/sparris-och-osterrikiskt-vin-i-harlig-kombo",
        permanent: true,
      },
      {
        source:
          "/blog/vin-tv/champagne-charles-heidsieck-besoks-av-fredrik-schelin",
        destination: "/fredrikschelin/champagne-charles-heidsieck",
        permanent: true,
      },
      {
        source: "/blog/vin-tv/cape-wine-2012-graham-beck-mousserande",
        destination: "/maja/cape-wine-har-dragit-igang",
        permanent: true,
      },
      {
        source:
          "/anders/sparris-och-osterrikiskt-vin-i-harlig-kombo/johann-topf-7",
        destination: "/anders/sparris-och-osterrikiskt-vin-i-harlig-kombo",
        permanent: true,
      },
      {
        source: "/fredrikschelin/bartenders-choice-awards-2012/alla",
        destination: "/fredrikschelin/bartenders-choice-awards-2012",
        permanent: true,
      },
      {
        source:
          "/anders/sparris-och-osterrikiskt-vin-i-harlig-kombo/johann-topf-6",
        destination: "/anders/sparris-och-osterrikiskt-vin-i-harlig-kombo",
        permanent: true,
      },
      {
        source: "/fredrikschelin/Husmanskost@pontusfrithiof.com",
        destination: "/",
        permanent: true,
      },
      {
        source:
          "/blog/recept/jerkkyckling-sotpotatissallad-med-mangovinegrette/de-loach-russian-river-valley-pinot-noir-nr-2222",
        destination:
          "/nordefors/jerkkyckling-sotpotatissallad-med-mangovinegrette",
        permanent: true,
      },
      {
        source: "/fredag-tillsammans-vecka-8",
        destination: "/fredrikschelin/fredag-tillsammans-8",
        permanent: true,
      },
      {
        source:
          "/anders/sparris-och-osterrikiskt-vin-i-harlig-kombo/johann-topf-11",
        destination: "/anders/sparris-och-osterrikiskt-vin-i-harlig-kombo",
        permanent: true,
      },
      {
        source: "/nordefors/2010/06/29/aioli",
        destination: "/nordefors/aioli",
        permanent: true,
      },
      {
        source: "/nordefors/2011/12/14/fudge-med-mork-choklad",
        destination: "/nordefors/fudge-med-mork-choklad",
        permanent: true,
      },
      {
        source:
          "/nordefors/2014/10/02/i-baren-with-niko-koskimies-cocktail-bars-you-would-like-to-visit-in-helsinki-finland",
        destination:
          "/nordefors/i-baren-with-niko-koskimies-cocktail-bars-you-would-like-to-visit-in-helsinki-finland",
        permanent: true,
      },
      {
        source:
          "/nordefors/2014/07/30/kockens-tips-fran-fredrik-gustafsson-omvand-cheesecake-med-blabar-farskostskum-och-limeglass",
        destination:
          "/nordefors/kockens-tips-fran-fredrik-gustafsson-omvand-cheesecake-med-blabar-farskostskum-och-limeglass",
        permanent: true,
      },
      {
        source:
          "/fredrikschelin/champagne-bast-i-test-2012/deutz-brut-classic-nr-7487",
        destination: "/fredrikschelin/champagne-bast-i-test-2012",
        permanent: true,
      },
      {
        source: "/fredrikschelin/champagne-bast-i-test-2012/attachment/3971",
        destination: "/fredrikschelin/champagne-bast-i-test-2012",
        permanent: true,
      },
      {
        source:
          "/fredrikschelin/champagne-bast-i-test-2012/jacquesson-cuvee-no-735-nr-74361",
        destination: "/fredrikschelin/champagne-bast-i-test-2012",
        permanent: true,
      },
      {
        source:
          "/fredrikschelin/champagne-bast-i-test-2012/fredrik-schelin-smakar-vin-hos-jacques-selosse-460x691",
        destination: "/fredrikschelin/champagne-bast-i-test-2012",
        permanent: true,
      },
      {
        source:
          "/fredrikschelin/champagne-bast-i-test-2012/pierre-peters-cuvee-de-reserve-nr-73502",
        destination: "/fredrikschelin/champagne-bast-i-test-2012",
        permanent: true,
      },
      {
        source: "/cap-classique",
        destination: "/fredrikschelin/cap-classique-3",
        permanent: true,
      },
      {
        source:
          "/fredrikschelin/champagne-bast-i-test-2012/andre-clouet-grande-reserve-nr-7686",
        destination: "/fredrikschelin/champagne-bast-i-test-2012",
        permanent: true,
      },
      {
        source:
          "/fredrikschelin/champagne-bast-i-test-2012/bollinger-special-cuvee-brut-nr-74181",
        destination: "/fredrikschelin/champagne-bast-i-test-2012",
        permanent: true,
      },
      {
        source:
          "/fredrikschelin/champagne-bast-i-test-2012/billecart-salmon-brut-rose-nr-7758",
        destination: "/fredrikschelin/champagne-bast-i-test-2012",
        permanent: true,
      },
      {
        source: "/fredrikschelin/champagne-bast-i-test-2012/attachment/3971",
        destination: "/fredrikschelin/champagne-bast-i-test-2012",
        permanent: true,
      },
      {
        source:
          "/fredrikschelin/champagne-bast-i-test-2012/jacquesson-cuvee-no-735-nr-74361",
        destination: "/fredrikschelin/champagne-bast-i-test-2012",
        permanent: true,
      },
      {
        source:
          "/fredrikschelin/champagne-bast-i-test-2012/fredrik-schelin-smakar-vin-hos-jacques-selosse-460x691",
        destination: "/fredrikschelin/champagne-bast-i-test-2012",
        permanent: true,
      },
      {
        source:
          "/fredrikschelin/champagne-bast-i-test-2012/baron-fuente-galipettes-brut-nr-7414",
        destination: "/fredrikschelin/champagne-bast-i-test-2012",
        permanent: true,
      },
      {
        source:
          "/fredrikschelin/champagne-bast-i-test-2012/henriot-millesime-brut-nr-7789",
        destination: "/fredrikschelin/champagne-bast-i-test-2012",
        permanent: true,
      },
      {
        source: "/wp/wp-admin/post-new.php",
        destination: "/",
        permanent: true,
      },
      {
        source: "/cap-classique-2/attachment/10534",
        destination: "/fredrikschelin/cap-classique-3",
        permanent: true,
      },
      {
        source:
          "/fredrikschelin/champagne-bast-i-test-2014-champagne-till-nyar-och-till-julbordet",
        destination: "/fredrikschelin/champagne-bast-i-test-2014",
        permanent: true,
      },
      {
        source:
          "/fredrikschelin/champagne-bast-i-test-2012/diebolt-vallois-prestige-brut-nr-7723",
        destination: "/fredrikschelin/champagne-bast-i-test-2012",
        permanent: true,
      },
      {
        source:
          "/cap-classique-2/graham-beck-brut-pinot-noir-chardonnay-nr-7639",
        destination: "/fredrikschelin/cap-classique-3",
        permanent: true,
      },
    ];
  },
  swcMinify: true,
  images: {
    domains: [process.env.CMS_BASE_URL, "i.ytimg.com", "img.youtube.com"],
    formats: ["image/avif", "image/webp"],
  },
  // webpack: (config, { dev, isServer }) => {
  //   // Replace React with Preact only in client production build
  //   if (!dev && !isServer) {
  //     Object.assign(config.resolve.alias, {
  //       react: "preact/compat",
  //       "react-dom/test-utils": "preact/test-utils",
  //       "react-dom": "preact/compat",
  //     });
  //   }

  //   return config;
  // },
};
