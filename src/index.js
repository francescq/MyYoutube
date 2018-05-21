import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import YTSearch from 'youtube-api-search';
import _ from 'lodash';

import SearchBar from './components/SearchBar';
import VideoList from './components/VideoList';
import VideoDetail from './components/VideoDetail'

const API_KEY = 'AIzaSyBQQ0uqnRPHy4xjOH9QcpLp4j2xponwnVo';

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            videos: [], 
            selectedVideo: null
        };

        this.videoSearch('surfboards');
    }

    onVideoSelect({video}) {
        this.setState({selectedVideo: video});
    }

    videoSearch(term) {
        YTSearch({key: API_KEY, term: term}, (videos) => {
            this.setState({videos, selectedVideo: videos[0]});
        });
    }

    render() {
        const videoSearch = _.debounce(term => this.videoSearch(term), 300)
        return (
            <div>
                <SearchBar onSearchTermChange={videoSearch}/>
                <VideoDetail video={this.state.selectedVideo} />
                <VideoList videos={this.state.videos} onVideoSelect={video => this.onVideoSelect(video)}/>
            </div>
        );
    }
}

ReactDOM.render(<App />, document.getElementById('container'));