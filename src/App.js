import logo from "./logo.svg";
import "./App.css";
import React, { Component } from "react";
import { json } from "react-router";
import axios from "axios";

// const {ServerClient, ServerClientConfig} = require('graphdb').server;
// const {RDFMimeType} = require('graphdb').http;
// const {RepositoryClientConfig} = require('graphdb').repository;

// const serverConfig = new ServerClientConfig('http://rdf4j-compliant-server/')
//     .setTimeout(5000)
//     .setHeaders({
//         'Accept': RDFMimeType.SPARQL_RESULTS_JSON
//     })
//     .setKeepAlive(true);

// const server = new ServerClient(serverConfig);

// const endpoint = 'http://GDB';
// const readTimeout = 30000;
// const writeTimeout = 30000;
// const config = new RepositoryClientConfig(endpoint)
//     .setEndpoints(['http://GDB/repositories/my-repo'])
//     .setHeaders({
//       'Accept': RDFMimeType.TURTLE
//     })
//     .setReadTimeout(readTimeout)
//     .setWriteTimeout(writeTimeout);
// //const repository = new RDFRepositoryClient(config);

let query_dict = {
  query_1: `prefix ont:<http://www.semanticweb.org/stephen/ontologies/2022/10/GroupL_V2#>
  prefix pos:<http://www.w3.org/2003/01/geo/wgs84_pos#>
  prefix sch:<http://schema.org/>
  select ?accom (count(?bin) as ?bincount)
  where {
      ?accom a sch:Accommodation .
      ?accom pos:lat ?accomlat .
      ?accom pos:long ?accomlong .
      
      ?bin a ont:Bin .
      ?bin pos:lat ?binlat .
      ?bin pos:long ?binlong .
      
      # radius = 1 km
      filter (
          ((?binlat-?accomlat)*110.567)*((?binlat-?accomlat)*110.567) + 
              ((?binlong-?accomlong)*110.567)*((?binlong-?accomlong)*110.567) <= 1    # radius^2
      )
  } group by ?accom`,

  query_2: `prefix ont:<http://www.semanticweb.org/stephen/ontologies/2022/10/GroupL_V2#>
  prefix pos:<http://www.w3.org/2003/01/geo/wgs84_pos#>
  prefix sch:<http://schema.org/>
  prefix con:<http://ontology.eil.utoronto.ca/icontact.owl#>
  select ?bin (count(?res) as ?rescount)
  where {
      ?res a sch:Residence .
      ?res con:hasAddress ?addr .
      
      ?addr pos:lat ?reslat .
      ?addr pos:long ?reslong .
      
      ?bin a ont:Bin .
      ?bin pos:lat ?binlat .
      ?bin pos:long ?binlong .
      
      # radius = 0.1 km
      filter (
          ((?reslat-?binlat)*110.567)*((?reslat-?binlat)*110.567) + 
              ((?reslong-?binlong)*110.567)*((?reslong-?binlong)*110.567) <= 0.01    # radius^2
      )
  } group by ?bin`,

  query_3: `prefix ont:<http://www.semanticweb.org/stephen/ontologies/2022/10/GroupL_V2#>
  prefix pos:<http://www.w3.org/2003/01/geo/wgs84_pos#>
  prefix sch:<http://schema.org/>
  prefix con:<http://ontology.eil.utoronto.ca/icontact.owl#>
  prefix reso:<http://www.dbpedia.org/resource/>
  select ?addrstring ?pr (count(?bin) as ?bincount)
  where {    
      ?res a sch:Residence .
      ?res con:hasAddress ?addr .
      ?res reso:price ?pr .
      
      ?addr pos:lat ?reslat .
      ?addr pos:long ?reslong .
      ?addr reso:address ?addrstring .
      
      ?bin a ont:Bin .
      ?bin pos:lat ?binlat .
      ?bin pos:long ?binlong .
      
      # radius = 1 km
      filter (
          ((?binlat-?reslat)*110.567)*((?binlat-?reslat)*110.567) + 
              ((?binlong-?reslong)*110.567)*((?binlong-?reslong)*110.567) <= 1    # radius^2
      )
  }
  group by ?addrstring ?pr
  order by desc(?pr)
  limit 1`,

  query_4: `prefix sch:<http://schema.org/>
  prefix reso:<http://www.dbpedia.org/resource/>
  select (count(?attr) as ?attrCount) ?accomCount
  where {
      ?attr a sch:TouristAttraction .
      ?attr reso:county ?attrCounty.
      {
          select (count(?accom) as ?accomCount)
          where {
              ?accom a sch:Accommodation .
              ?accom reso:county ?accomCounty.
              filter(strstarts(?accomCounty,"Cork")).
          }
      }
      filter(strstarts(?attrCounty,"Cork"))
  } group by ?accomCount`,

  query_5: `prefix ont:<http://www.semanticweb.org/stephen/ontologies/2022/10/GroupL_V2#>
  prefix pos:<http://www.w3.org/2003/01/geo/wgs84_pos#>
  prefix sch:<http://schema.org/>
  prefix con:<http://ontology.eil.utoronto.ca/icontact.owl#>
  select ?attr (count(?fine) as ?finecount) ?url ?phonestring
  where {
      ?attr a sch:TouristAttraction .
      ?attr pos:lat ?attrlat .
      ?attr pos:long ?attrlong .
      
      ?website ont:isWebsiteOf ?attr .
      ?website sch:url ?url .
      
      ?attr ont:isTelephoneOf ?phone .
      ?phone con:hasPhoneNumber ?phonestring .
      
      ?fine a ont:LitterFine .
      ?fine con:hasAddress ?addr .
      ?addr pos:lat ?finelat .
      ?addr pos:long ?finelong .
      
      # radius = 0.1 km
      filter (
          ((?finelat-?attrlat)*110.567)*((?finelat-?attrlat)*110.567) + 
              ((?finelong-?attrlong)*110.567)*((?finelong-?attrlong)*110.567) <= 0.01    # radius^2
      )
  }
  group by ?attr ?url ?phonestring
  order by desc(?finecount)
  limit 1`,

  query_6: `prefix ont:<http://www.semanticweb.org/stephen/ontologies/2022/10/GroupL_V2#>
  prefix pos:<http://www.w3.org/2003/01/geo/wgs84_pos#>
  prefix con:<http://ontology.eil.utoronto.ca/icontact.owl#>
  select ?bin (count(?fine) as ?finecount)
  where {    
      ?fine a ont:LitterFine .
      ?fine con:hasAddress ?addr .
      ?addr pos:lat ?finelat .
      ?addr pos:long ?finelong .
      
      ?bin a ont:Bin .
      ?bin pos:lat ?binlat .
      ?bin pos:long ?binlong .
      
      # radius = 0.1 km
      filter (
          ((?finelat-?binlat)*110.567)*((?finelat-?binlat)*110.567) + 
              ((?finelong-?binlong)*110.567)*((?finelong-?binlong)*110.567) <= 0.01    # radius^2
      )
  }
  group by ?bin`,

  query_7: `prefix pos:<http://www.w3.org/2003/01/geo/wgs84_pos#>
  prefix sch:<http://schema.org/>
  prefix con:<http://ontology.eil.utoronto.ca/icontact.owl#>
  prefix reso:<http://www.dbpedia.org/resource/>
  select ?attr ?addrstring (max(?pr) as ?maxpr)
  where {
      ?attr a sch:TouristAttraction .
      ?attr pos:lat ?attrlat .
      ?attr pos:long ?attrlong .
      
      ?res a sch:Residence .
      ?res con:hasAddress ?addr .
      ?addr pos:lat ?reslat .
      ?addr pos:long ?reslong .
      ?res reso:price ?pr .
      ?addr reso:address ?addrstring .
      
      # radius = 0.1 km
      filter (
          ((?reslat-?attrlat)*110.567)*((?reslat-?attrlat)*110.567) + 
              ((?reslong-?attrlong)*110.567)*((?reslong-?attrlong)*110.567) <= 0.01    # radius^2
      )
  }
  group by ?attr ?addrstring`,

  query_8: `prefix ont:<http://www.semanticweb.org/stephen/ontologies/2022/10/GroupL_V2#>
  prefix pos:<http://www.w3.org/2003/01/geo/wgs84_pos#>
  prefix sch:<http://schema.org/>
  
  select distinct ?attr ?accom ?url 
  where {
      ?accom a sch:Accommodation.
      ?accom pos:lat ?accomlat .
      ?accom pos:long ?accomlong .
     
      ?accom ont:hasWebsite ?website .
      ?website sch:url ?url .
  
      ?attr a sch:TouristAttraction .
      ?attr pos:lat ?attrlat .
      ?attr pos:long ?attrlong .
      
      # radius = 0.1 km
      filter (
          ((?attrlat-?accomlat)*110.567)*((?attrlat-?accomlat)*110.567) + 
              ((?attrlong-?accomlong)*110.567)*((?attrlong-?accomlong)*110.567) <= 0.01    # radius^2
      )
  }
  group by ?attr ?accom ?url `,

  query_9: `prefix ont:<http://www.semanticweb.org/stephen/ontologies/2022/10/GroupL_V2#>
  prefix pos:<http://www.w3.org/2003/01/geo/wgs84_pos#>
  prefix con:<http://ontology.eil.utoronto.ca/icontact.owl#>
  
  select (count(?lit) as ?litCount) ?binCount
  where {
      ?lit a ont:LitterFine .
      ?lit con:hasAddress ?addr .
      ?addr pos:lat ?litLat.
      ?addr pos:long ?litLong.
      {
          select (count(?bin) as ?binCount)
          where {
              ?bin a ont:Bin .
              ?bin pos:lat ?binLat.
              ?bin pos:long ?binLong.
              bind(6.12347161 as ?radius).
              bind(53.3498 as ?dubLat).
              bind(-6.2603 as ?dubLong).
              bind(110.567 as ?degreeToKm).
               filter(
                  ?binLat < (?dubLat + (?radius*?degreeToKm))
                  && ?binLat > (?dubLat - (?radius*?degreeToKm))
                  && ?binLong < (?dubLong + (?radius*?degreeToKm))
              && ?binLong > (?dubLong - (?radius*?degreeToKm))
          )
          }
      }
      bind(6.12347161 as ?radius).
      bind(53.3498 as ?dubLat).
      bind(-6.2603 as ?dubLong).
      bind(110.567 as ?degreeToKm).
       filter(
                 ?litLat < (?dubLat + (?radius*?degreeToKm))
              && ?litLat > (?dubLat - (?radius*?degreeToKm))
              && ?litLong < (?dubLong + (?radius*?degreeToKm))
              && ?litLong > (?dubLong - (?radius*?degreeToKm))
      )
  } group by ?binCount`,

  query_10: `prefix sch:<http://schema.org/>
  prefix reso:<http://www.dbpedia.org/resource/>
  select (count(?attr) as ?attrCount) ?attrCounty ?accomCount ?accomCounty
  where {
      ?attr a sch:TouristAttraction .
      ?attr reso:county ?attrCounty.
      {
          select (count(?accom) as ?accomCount) ?accomCounty 
          where{
           ?accom a sch:Accommodation.
           ?accom reso:county ?accomCounty.   
          }
          group by ?accomCounty
          
      }
  } group by ?attrCounty ?accomCount ?accomCounty
  order by desc(?attrCount) `,
};

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      kde_query_results: [],
    };
  }

  componentDidMount() {
   
  }

  
  getdata(queryNumber){
  var query = query_dict["query_"+queryNumber];
    
    let data = {
      method: 'GET' ,
      mode: 'no-cors',
      cache: 'default',
      headers: { Accept: "application/sparql-results+json", }
    };

    let url = `http://localhost:7200/repositories/KDE?query=${encodeURIComponent(query)}`;
    fetch(url)
    .then((response) => response.text())
    .then((data) => {return data});

  }
  



  render() {
    const openInNewTab = url => {
      window.open(url, '_blank', 'noopener,noreferrer');
    };

    return (
      <div>
        <h1> Knowledge Graph</h1>
        <span>{this.state.kde_query_results}</span>
        <button onClick={() => openInNewTab('/query1')}>
          Query1
        </button>
        <button onClick={() => openInNewTab('/query2')} >
          Query2
        </button>
        <button onClick={() => openInNewTab('/query3')} >
          Query3
        </button>
        <button onClick={() => openInNewTab('/query4')} >
          Query4
        </button>
        <button onClick={() => openInNewTab('/query5')} >
          Query5
        </button>
        <button onClick={() => openInNewTab('/query6')} >
          Query6
        </button>
        <button onClick={() => openInNewTab('/query7')} >
          Query7
        </button>
        <button onClick={() => openInNewTab('/query8')} >
          Query8
        </button>
        <button onClick={() => openInNewTab('/query9')} >
          Query9
        </button>
        <button onClick={() => openInNewTab('/query10')} >
          Query10
        </button>
      </div>
    );
  }
}

export default App;
