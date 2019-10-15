function displayGraph(graph){
	//TODO: remove all reversable actions

    let container = document.getElementById("graphContainer");
    container.innerHTML = "";
    container.style.display = "block";
	let s = new sigma({
		graph: graph,
		container: 'graphContainer'
	});
	s.startForceAtlas2({worker: true, barnesHutOptimize: true,linLogMode: true,adjustSizes:true,iterationsPerRender:5, slowDown:0.1});
	//setTimeout(()=>s.stopForceAtlas2(), 10000);
}

function bruteForce(makeGraph = false) {
	let hashMap = {};
	let stackIt = 0;
	let hashStack = [String.fromCharCode(...level.objects)];
	let graph = {
		nodes: [],
		edges: []
	};
	for(let j = 0; j < 10000; j++){
		//Load next state
		let originHash = hashStack[stackIt++];
		for(let k = 0; k < level.n_tiles; k++){
			level.objects[k] = originHash.charCodeAt(k);
		}
		//Explore all moves
		for(let i = 0; i < 4; i++){//Math.floor(Math.random()*5)
			//Ignore move if nothing changed
			if(!processInput(i, false))
				continue;
			//Finish exploration if winning
			if(winning){
				if(makeGraph) displayGraph(graph);
				return `Finished in ${j} steps`;
			}
			//Save new state hash
			let hash = String.fromCharCode(...level.objects);
			if(!hashMap[hash]){
				hashMap[hash] = true;
				hashStack[hashStack.length] = hash;
				graph.nodes[graph.nodes.length] = {
					id: hash,
					x: Math.random()*500-250,
					y: Math.random()*500-250,
                    size: 1,
                    color: "#fff"
				};
			}
			//Link the nodes
			graph.edges[graph.edges.length] = {
				id:graph.edges.length,
				source: originHash,
				target: hash,
                color: "#fff"
			};
			DoUndo();
		}
		if(stackIt === hashStack.length){
			if(makeGraph) displayGraph(graph);
			return "No solution found";
		}
	}
	if(makeGraph) displayGraph(graph);
	return "Faillure";
}