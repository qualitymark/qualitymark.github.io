
//I am not sure if this will work at all or part of it can be used to render the search bar.  
//Also do not know where to put it...
class SearchBar extends React.Component {
  render() {
    return (
      <form>
        <input type="text" placeholder="Search Company..." />
      </form>
    );
  }
}

or

<form>
        <input
          placeholder="Search for..."
          ref={input => this.search = input}
          onChange={this.handleInputChange}
        />
        <p>{this.state.value}</p>
      </form> 
	  
	  
class FilterableProductTable extends React.Component {
  render() {
    return (
      <div>
        <SearchBar />
      </div>
    );
	
	 <form>
        <input
          placeholder="Search for..."
          ref={input => this.search = input}
          onChange={this.handleInputChange}
        />
        <p>{this.state.query}</p>
      </form>