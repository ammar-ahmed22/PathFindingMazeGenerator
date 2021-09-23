const instructions = (
    <>
        <div className="header-text">
            <h5 className="px-3 py-2 my-0 fw-light text-pink">Instructions</h5>
        </div>
                    
        <ol className="fw-light">
            <li>Click <code>Generate Maze</code> to start maze generation</li>
            <li>Once maze is generated, drag <code className="text-success">start</code> and <code className="text-danger">end</code> nodes to set them</li>
            <li>Click <code>Find Path</code> to find optimal path between start and end</li> 
        </ol>
    </>
);

export default instructions;