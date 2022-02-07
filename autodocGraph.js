
var vm = new Vue({
  el: '#app',
  data: {
		prock: { 
			"Info": {"object_id":576109193,"Name":"Appointment.Appointment_API_InsertUpdate_FieldByField","Length":10549,"SchemaName":"Appointment","ObjectName":"Appointment_API_InsertUpdate_FieldByField"}, "MetaDataReference": [{}], 
			"Calls": [{"object_id":1147919211,"Name":"Appointment.AppointmentStatus_API_GetIdForCancelled","SchemaName":"Appointment","ObjectName":"AppointmentStatus_API_GetIdForCancelled"},{"object_id":1184111359,"Name":"Appointment.Appointment_InsertUpdate_Internal","SchemaName":"Appointment","ObjectName":"Appointment_InsertUpdate_Internal"},{"object_id":1380968046,"Name":"Room.Room_API_All","SchemaName":"Room","ObjectName":"Room_API_All"},{"object_id":1985494202,"Name":"Util.User_GetIdForScheduledJob","SchemaName":"Util","ObjectName":"User_GetIdForScheduledJob"}],
			"ReferencedBy":[{"object_id":121155577,"Name":"AppointmentIntegration.CreateAppointment","SchemaName":"AppointmentIntegration","ObjectName":"CreateAppointment"},{"object_id":185155805,"Name":"AppointmentIntegration.UpdateAppointment","SchemaName":"AppointmentIntegration","ObjectName":"UpdateAppointment"},{"object_id":544109079,"Name":"Appointment.Appointment_API_ConnectToAppointmentGroup_Internal","SchemaName":"Appointment","ObjectName":"Appointment_API_ConnectToAppointmentGroup_Internal"},{"object_id":858642302,"Name":"Appointment.Web_Appointment_NumberOfParticipants_Update","SchemaName":"Appointment","ObjectName":"Web_Appointment_NumberOfParticipants_Update"},{"object_id":880110276,"Name":"Appointment.Appointment_AppointmentStatus_InsertUpdate","SchemaName":"Appointment","ObjectName":"Appointment_AppointmentStatus_InsertUpdate"},{"object_id":944110504,"Name":"Appointment.Appointment_Cancel","SchemaName":"Appointment","ObjectName":"Appointment_Cancel"},{"object_id":956634551,"Name":"Appointment.Web_Appointment_CustomerNumber_Update","SchemaName":"Appointment","ObjectName":"Web_Appointment_CustomerNumber_Update"},{"object_id":1004634722,"Name":"Appointment.Web_Appointment_Insert","SchemaName":"Appointment","ObjectName":"Web_Appointment_Insert"},{"object_id":1617597001,"Name":"Appointment.AppointmentSeries_Appointment_EditableGrid","SchemaName":"Appointment","ObjectName":"AppointmentSeries_Appointment_EditableGrid"},{"object_id":1776113468,"Name":"Appointment.AppointmentSeries_Appointment_InsertUpdate_Internal_AddOn","SchemaName":"Appointment","ObjectName":"AppointmentSeries_Appointment_InsertUpdate_Internal_AddOn"},{"object_id":1849877757,"Name":"ExchangeSynchronisation.AppointmentImport","SchemaName":"ExchangeSynchronisation","ObjectName":"AppointmentImport"}]},

		status: {
				"CurrentItem" : 
					{
					"schema": "Appointment",
					"name": "Appointment_API_InsertUpdate_FieldByField"
					},
				"Database":	"Stortinget"
		}
	},
	methods :{
		 distinctCallSchemas: function () {
			return [...new Set(this.prock.Calls.map(item => item.SchemaName))]; 
    },
		
		distinctReferencedSchemas: function () {
			return [...new Set(this.prock.ReferencedBy.map(item => item.SchemaName))]; 
    },

		GetSchemas: function(Schema) {
			var filtered = this.prock.Calls.filter(function(element) {
				return element.SchemaName === Schema;
			});
			return filtered;
		},
		
		GetReferencedSchemas: function(Schema) {
			var filtered = this.prock.ReferencedBy.filter(function(element) {
				return element.SchemaName === Schema;
			});
			return filtered;
		},
		
		GetProc: function(schema, name) {
			console.log("Getting " + schema + "." + name)
			var newProck = null;
			status = $.ajax({
				dataType: "json",
				url: 'http://pegasus/pegasus_demo/Multirest/AutoDoc/Stortinget_Bokningssystem/'+schema+'/'+name,
				data: null,
				success: function(prockInfo) {
					vm.prock = (prockInfo);
					vm.status.CurrentItem.schema = schema;
					vm.status.CurrentItem.name = name;
					console.log(prockInfo);
					setTimeout(vm.LoadGraph, 100); // TODO: Find a better way to "wait" for vue to render the mermaid input data
				},
				error: function(prockInfo) {
					console.error("Failed to load prockInfo");
				}
			});
   		},
		LoadGraph: function() {
			var input = document.getElementById("input");
			input.value = $('#rawValue').text();
			vm.RenderGraph();
		},
		RenderGraph: function() {
			//input.value = $('#rawValue').text();
			var input = document.getElementById("input");
			var output = document.getElementById("output");
			mermaid.render('theGraph', input.value, function(svgCode) {
				output.innerHTML = svgCode;
			});
		},
		EscapeLabel : function(name) {
			return name
				.replaceAll('&', '&amp;')
				.replaceAll('<', '&lt;')
				.replaceAll('>', '&gt;')
				.replaceAll('"', '&quot;')
				.replaceAll("'", '&#039;')
				.replaceAll('[', '').replaceAll(']', '');
		}
  	}  
});

$(function(){
	console.log("Loading site with new params");
	let params = new URLSearchParams(document.location.search);
	let newProck = params.get("callback"); 
	if(newProck.split('.').length == 2)
	{
		vm.GetProc(newProck.split('.')[0], newProck.split('.')[1]);
	}
	
});
