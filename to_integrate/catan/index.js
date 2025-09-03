function genMap(map, terrain, ports, rolls) {
  map = map.split(',');
  let baseTerrain = terrain.split(',');
  let basePorts = ports.split('');

  //assigning terrains and ports with plank positions
  let wInFirstRow = 0;
  for (let i = 0; i < map[0].length; i++) {
    if (map[0][i] == 'w') {
      wInFirstRow++;
    }
  }
  let lastPort = '';
  let topRight = false;
  for (let row = 0; row < map.length; row++) {
    map[row] = map[row].split('');
    let wInRow = 0;
    for (let col = 0; col < map[row].length; col++) {
      if (map[row][col] != '_' && map[row][col] != '-' && map[row][col] != 'w') {
        if (baseTerrain.length == 0) {
          baseTerrain = terrain.split(',');
        }
        let terrainIndex = Math.floor(Math.random() * baseTerrain.length);
        map[row][col] = {terrain: baseTerrain[terrainIndex]};
        baseTerrain.splice(terrainIndex, 1);
      }else {
        if (map[row][col] == 'w') {
          if (basePorts.length == 0) {
            basePorts = ports.split('');
          }
          let portIndex = Math.floor(Math.random() * basePorts.length);
          map[row][col] = {terrain: 'x'};
          if (row == 0) {
            if (wInRow%2 == 0) {
              map[row][col] = {terrain: 'p'+basePorts[portIndex]};
              basePorts.splice(portIndex, 1);
              if (col < map[row].length-1) {
                map[row][col].plankLoc = 'br';
              }else {
                map[row][col].plankLoc = 'bl';
              }
            }
          }else if (row == map.length-1) {
            if (lastPort == 'r') {
              if (wInRow%2 == 0) {
                map[row][col] = {terrain: 'p'+basePorts[portIndex]};
                basePorts.splice(portIndex, 1);
                if (wInRow == 0) {
                  map[row][col].plankLoc = 'tr';
                }else {
                  map[row][col].plankLoc = 'tl';
                }
              }
            }else {
              if (wInRow%2 == 1) {
                map[row][col] = {terrain: 'p'+basePorts[portIndex]};
                basePorts.splice(portIndex, 1);
                map[row][col].plankLoc = 'tl';
              }
            }
          }else {
            if (wInRow == 1 && row%2 == 1) {
              if (row == 1) {
                if (wInFirstRow%2 == 0) {
                  map[row][col] = {terrain: 'p'+basePorts[portIndex]};
                  basePorts.splice(portIndex, 1);
                  lastPort = 'r';
                  topRight = true;
                  map[row][col].plankLoc = 'l';
                }
              }else {
                map[row][col] = {terrain: 'p'+basePorts[portIndex]};
                basePorts.splice(portIndex, 1);
                lastPort = 'r';
                map[row][col].plankLoc = 'l';
              }
            }else if (wInRow == 0) {
              if (row == map.length-2) {
                if (topRight && row%2 == 0) {
                  map[row][col] = {terrain: 'p'+basePorts[portIndex]};
                  basePorts.splice(portIndex, 1);
                  lastPort = 'l';
                  map[row][col].plankLoc = 'r';
                }
              }else if (row%2 == 0) {
                map[row][col] = {terrain: 'p'+basePorts[portIndex]};
                basePorts.splice(portIndex, 1);
                lastPort = 'l';
                map[row][col].plankLoc = 'r';
              }
            }
          }
          wInRow++;
        }else {
          map[row][col] = {terrain: map[row][col]};
        }
      }
    }
  }

  //assigning rolls
  let guarRolls = rolls.split(',');
  let safeRolls = rolls.replace(/6,/g, '').replace(/8,/g, '').split(',');
  let not68 = [];
  for (let row = 0; row < map.length; row++) {
    let offset = 0;
    let passes = 0;
    not68.push([]);
    if (row < map.length-2) {
      not68.push([]);
    }
    for (let col = 0; col < map[row].length; col++) {
      if (map[row][col].terrain == '_') {
        offset += 0.5;
      }else if (['-', 'x', 'p', 'd'].includes(map[row][col].terrain[0])) {
        offset++;
      }else {
        offset++;
        while (true) {
          if (guarRolls.length == 0) {
            guarRolls = rolls.split(',');
          }
          if (passes < 3) {
            var index = Math.floor(Math.random() * guarRolls.length);
            var roll = guarRolls[index];
          }else {
            if (safeRolls.length == 0) {
              safeRolls = rolls.replace(/6,/g, '').replace(/8,/g, '').split(',');
            }
            var roll = safeRolls[Math.floor(Math.random() * safeRolls.length)];
          }
          if (roll == '6' || roll == '8') {
            if (!not68[row].includes(offset)) {
              map[row][col].roll = roll;
              not68[row].push(offset+1);
              if (not68[row+1]) {
                not68[row+1].push(offset-0.5, offset+0.5);
              }
              if (index != undefined && passes < 3) {
                if (guarRolls.length == 1) {
                  guarRolls = [];
                }else {
                  guarRolls.splice(index, 1);
                }
              }
              passes = 0;
              break;
            }else {
              passes++;
            }
          }else {
            map[row][col].roll = roll;
            if (index != undefined && passes < 3) {
              if (guarRolls.length == 1) {
                guarRolls = [];
              }else {
                guarRolls.splice(index, 1);
              }
            }
            passes = 0;
            break;
          }
        }
      }
    }
  }
  return map;
}

function getCoords(map, vertToVert, apothem) {
  let coords = {centers: [], edges: [], vertices: []};
  let lastLen = map[0].length;
  for (let row = 0; row < map.length; row++) {
    let top = vertToVert/2;
    let left = apothem;
    if (map[row][0].terrain == '_') {
      left = 0;
    }
    for (let col = 0; col < map[row].length; col++) {
      //used multiple times
      let acp3 = apothem*Math.cos(Math.PI/3);
      let asp3 = apothem*Math.sin(Math.PI/3);
      //centers 
      let cx = left + col*2*apothem;
      let cy = top + row*apothem*Math.sqrt(3);
      if (map[row][col].roll) {
        coords.centers.push({x: cx, y: cy, terrain: map[row][col].terrain, roll: map[row][col].roll});
      }else if (map[row][col].plankLoc) {
        coords.centers.push({x: cx, y: cy, terrain: map[row][col].terrain, plankLoc: map[row][col].plankLoc});
      }else {
        coords.centers.push({x: cx, y: cy, terrain: map[row][col].terrain});
      }
      //edges
      let ebl = {x: cx - acp3, y: cy + asp3};
      let ebr = {x: cx + acp3, y: cy + asp3};
      let er = {x: cx + apothem, y: cy};
      coords.edges.push(ebl, ebr, er);
      //vertices
      let vbl = {x: cx - apothem, y: cy + apothem/2};
      let vb = {x: cx, y: cy + vertToVert/2};
      coords.vertices.push(vbl, vb);
      if (row == 0) {
        //edges
        let etl = {x: cx - acp3, y: cy - asp3};
        let etr = {x: cx + acp3, y: cy - asp3};
        coords.edges.push(etl, etr);
        //vertices 
        let vtl = {x: cx - apothem, y: cy - apothem/2};
        let vt = {x: cx, y: cy - vertToVert/2};
        coords.vertices.push(vtl, vt);
        if (col == map[row].length-1) {
          let vtr = {x: cx + apothem, y: cy - apothem/2};
          coords.vertices.push(vtr);
        }
      }
      if (col == 0) {
        //edges
        let el = {x: cx - apothem, y: cy};
        coords.edges.push(el);
        if (lastLen < map[row].length) {
          //edges
          let etl = {x: cx - acp3, y: cy - asp3};
          coords.edges.push(etl);
          //vertices
          let vtl = {x: cx - apothem, y: cy - apothem/2};
          coords.vertices.push(vtl);
        }
      }else if (col == map[row].length-1) {
        //vertices
        let vbr = {x: cx + apothem , y: cy + apothem/2}
        coords.vertices.push(vbr);
        if (lastLen < map[row].length) {
          //edges
          let etr = {x: cx + acp3, y: cy - asp3};
          coords.edges.push(etr);
          //vertices
          let vtr = {x: cx + apothem, y: cy - apothem/2};
          coords.vertices.push(vtr);
        }
      }  
    }
    lastLen = map[row].length;
  }
  return coords;
}

function drawMap(coords, vertToVert, ctx, scale) {
  function afterLoad(toDraw, loaded) {
    if (loaded == toDraw.length) {
      for (let i = 0; i < toDraw.length; i++) {
        ctx.drawImage(toDraw[i].img, toDraw[i].x, toDraw[i].y, toDraw[i].w, toDraw[i].h);
      }
    }
  }

  let images = {forest: 'img/forest.svg', stone: 'img/stone.svg', water: 'img/water.svg',
                brick: 'img/brick.svg', sheep: 'img/sheep.svg', wheat: 'img/wheat.svg',
                desert: 'img/desert.svg',
                portrampr: 'img/portrampr.svg', portrampl: 'img/portrampl.svg',
                portrampbr: 'img/portrampbr.svg', portrampbl: 'img/portrampbl.svg',
                portramptr: 'img/portramptr.svg', portramptl: 'img/portramptl.svg',
                port3to1: 'img/3to1port.svg', brickport: 'img/brickport.svg', lumberport: 'img/lumberport.svg',
                stoneport: 'img/stoneport.svg', wheatport: 'img/wheatport.svg', woolport: 'img/woolport.svg',
                roll2: 'img/roll2.svg', roll3: 'img/roll3.svg', roll4: 'img/roll4.svg', roll5: 'img/roll5.svg', 
                roll6: 'img/roll6.svg', roll8: 'img/roll8.svg', roll9: 'img/roll9.svg', roll10: 'img/roll10.svg', 
                roll11: 'img/roll11.svg', roll12: 'img/roll12.svg'};
      
  let toDraw = [];
  //terrain
  for (let i = 0; i < coords.centers.length; i++) {
    let x = coords.centers[i].x * scale;
    let y = coords.centers[i].y * scale;
    let sF = 600/(vertToVert*scale);

    let img = new Image();
    let terrain = coords.centers[i].terrain;
    if (terrain == 'f') {
      img.src = images.forest;
    }else if (terrain == 's') {
      img.src = images.sheep;
    }else if (terrain == 'w') {
      img.src = images.wheat;
    }else if (terrain == 'o') {
      img.src = images.stone;
    }else if (terrain == 'b') {
      img.src = images.brick;
    }else if (terrain == 'd') {
      img.src = images.desert;
    }else if (terrain == 'x') {
      img.src = images.water;
    }else if (terrain[0] == 'p') {
      let plankLoc = coords.centers[i].plankLoc
      if (plankLoc == 'r') {
        img.src = images.portrampr;
      }else if (plankLoc == 'l') {
        img.src = images.portrampl;
      }else if (plankLoc == 'br') {
        img.src = images.portrampbr;
      }else if (plankLoc == 'bl') {
        img.src = images.portrampbl;
      }else if (plankLoc == 'tr') {
        img.src = images.portramptr;
      }else if (plankLoc == 'tl') {
        img.src = images.portramptl;
      }
    }
    if (img.src) {
      let w = 520;
      let h = 600;
      let l = 1.02;
      toDraw.push({img: img, x: x - l*w/(2*sF), y: y - l*h/(2*sF), w: l*w/sF, h: l*h/sF});
      img.onload = function() {
        loaded++;
        afterLoad(toDraw, loaded);
      }
    }
  }
  //ports
  for (let i = 0; i < coords.centers.length; i++) {
    let terrain = coords.centers[i].terrain;
    if (terrain[0] == 'p') {
      let x = coords.centers[i].x * scale;
      let y = coords.centers[i].y * scale;
      let img = new Image();
      if (terrain == 'pf') {
        img.src = images.lumberport;
      }else if (terrain == 'ps') {
        img.src = images.woolport;
      }else if (terrain == 'po') {
        img.src = images.stoneport;
      }else if (terrain == 'pb') {
        img.src = images.brickport;
      }else if (terrain == 'pw') {
        img.src = images.wheatport;
      }else if (terrain == 'p3') {
        img.src = images.port3to1;
      }
      let w = 520;
      let h = 600;
      let sF = 1.75*h/(vertToVert*scale);
      toDraw.push({img: img, x: x - w/(2*sF), y: y - h/(2*sF), w: w/sF, h: h/sF});
      img.onload = function() {
        loaded++;
        afterLoad(toDraw, loaded);
      }
    }
  }
  //rolls
  let loaded = 0;
  for (let i = 0; i < coords.centers.length; i++) {
    let roll = coords.centers[i].roll;
    if (roll) {
      let x = coords.centers[i].x * scale;
      let y = (coords.centers[i].y - vertToVert/4) * scale;

      let img = new Image();
      img.src = 'img/roll' + roll + '.svg';
      let w = 500;
      let h = 300;
      let apothem = vertToVert/2 * Math.sin(Math.PI/3);
      let sF = 1.25*w/(apothem*scale);
      toDraw.push({img: img, x:  x - w/(2*sF), y: y - 0.2*h/(2*sF), w: w/sF, h: h/sF});
      img.onload = function() {
        loaded++;
        afterLoad(toDraw, loaded);
      }
    }
  }
}

function getWHVA(map) {
  let widest = 0;
  for (let row = 0; row < map.length; row++) {
    let isWidest = 0;
    for (let col = 0; col < map[row].length; col++) {
      if (map[row][col].terrain == '_') {
        isWidest += 1;
      }else {
        isWidest += 2;
      }
    }
    if (isWidest > widest) {
      widest = isWidest;
    }
  }
  let h = window.innerHeight;
  let vertToVert = h/(map.length-(0.25*(map.length-1)));
  let apothem = vertToVert/2 * Math.sin(Math.PI/3);
  let w = widest*apothem;
  return {h: h, w:w, vtv: vertToVert*0.99, apoth: apothem};
}

function main() {
  let maps = ['_-wwww,-wlllw,_wllllw,wlllllw,_wllllw,-wlllw,_-wwww',
              '--wwwww,_-wllllw,-wlllllw,_wllllllw,wllllllw,_wlllllw,-wllllw,_-wwwww',
              '--wwww,_-wlllw,-wllllw,_wlllllw,wllllllw,_wlllllw,-wllllw,_-wlllw,--wllw'];
  let terrain = 'f,f,f,f,s,s,s,s,w,w,w,w,o,o,o,b,b,b,d';
  let ports = 'fsobw3333';
  let rolls = '2,3,3,4,4,5,5,6,6,8,8,9,9,10,10,11,11,12';
  let map = genMap(maps[1], terrain, ports, rolls);

  let whva = getWHVA(map);

  let can = document.getElementById('canvas');
  let ctx = can.getContext('2d');
  let scale = 2;
  can.width = whva.w * scale ;
  can.height = whva.h * scale;

  let coords = getCoords(map, whva.vtv, whva.apoth);
  drawMap(coords, whva.vtv, ctx, scale);
}

main();