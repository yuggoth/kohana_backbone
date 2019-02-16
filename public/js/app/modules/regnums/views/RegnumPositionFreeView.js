define([

    // Libs
    'backbone', '../models/RegnumPosition', '../views/RegnumPositionView', '../views/OrderPositionSerialNumberListView', 'text!../templates/regnum-free-regnum-position-template.html'
], function (Backbone, RegnumPosition, RegnumPositionView, OrderPositionSerialNumberListView, Template) {

    var RegnumPositionFreeView = Backbone.View.extend({
            tagName: "tbody",
            // 	className: "table_zakaz_position",

            template: _.template(Template),
            events: {
                "click .add_for_uchet": "addForUchet"
            },
            initialize: function () {
                this.model.bind('change', this.render, this);
                this.model.bind('destroy', this.remove, this);

            },
            render: function () {
                this.$el.html(this.template(this.model.toJSON()));
                if (this.model.attributes.count - this.model.attributes.count_used == 0) {
                    this.$el.hide();
                } else {
                    this.$el.show();
                }
                return this;
            },
            addForUchet: function () {
                //	   if (parseInt(this.$el.children("tr").children("td:eq(3)").text()) - 1 == 0) {
                //		   this.$el.slideUp("slow");
                //	   } else {
                //		   this.$el.children("tr").children("td:eq(3)").text(this.model.get("count") - this.model.get("count_used") - 1);
                //	   }	
                this.model.set({
                    "count_used": parseInt(this.model.attributes.count_used) + 1
                });
                var new_pos = new RegnumPosition;
                new_pos.set({
                    "bu_pos_id": this.model.attributes.id,
                    "name": this.model.attributes.name,
                    "equipment_type_id": this.model.attributes.equipment_type_id,
                    "ispo": this.model.attributes.ispo,
                    "orders_positions_id": this.model.attributes.orders_positions_id,
                    "serial_number": this.model.attributes.serial_number
                });
                regnum.get("positions").push(new_pos);
                //   var view = new RegnumPositionView({model:new_pos});
                //   $(".uchet_cart").find("table").append(view.render().el);				   

                return false;
            }

        });

    return RegnumPositionFreeView;

});