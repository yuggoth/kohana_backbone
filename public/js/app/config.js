requirejs.config({

  deps: ['main'],

  paths: {
    'jquery': '../libs/jquery',
    'jqueryUI': '../libs/jquery-ui',    
    'underscore': '../libs/underscore',
    'backbone': '../libs/backbone',
    'backbone-relational': '../libs/backbone-relational',
    'backbone-paginator': '../libs/backbone-paginator',   
    
    // Plugins
    'text': '../libs/text'
  },

  shim: {
    'backbone': {
      deps: ['jquery', 'underscore'],
      exports: 'Backbone'
    },
    'jqueryUI': {
    	deps: ['jquery'],
    	exports: 'jqueryUI'
    },
    'backbone-relational': {
        deps: ['backbone'],
        exports: 'BackboneRelational'
      },
     'backbone-paginator': {
          deps: ['backbone'],
          exports: 'BackbonePaginator'
      }
  }

});