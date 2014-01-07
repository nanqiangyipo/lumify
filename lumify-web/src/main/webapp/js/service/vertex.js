define(
    [
        'service/serviceBase'
    ],
    function (ServiceBase) {
        'use strict';

        function VertexService() {
            ServiceBase.call(this);
            return this;
        }

        VertexService.prototype = Object.create(ServiceBase.prototype);

        VertexService.prototype.setProperty = function (vertexId, propertyName, value) {
            return this._ajaxPost({
                url: 'vertex/' + vertexId + '/property/set',
                data: {
                    propertyName: propertyName,
                    value: value
                }
            });
        };

        VertexService.prototype.deleteProperty = function (vertexId, propertyName) {
            return this._ajaxPost({
                url: 'vertex/' + vertexId + '/property/delete',
                data: {
                    propertyName: propertyName
                }
            });
        };

        VertexService.prototype.getMultiple = function (vertexIds) {
            return this._ajaxGet({
                url: 'vertex/multiple',
                data: {
                    vertexIds: vertexIds
                }
            });
        };

        VertexService.prototype.getRelationships = function(ids) {
            return this._ajaxPost({
                url: 'entity/relationships',
                data: {
                    ids: ids
                }
            });
        };

        VertexService.prototype.deleteEdge = function(sourceId, targetId, label) {
            return this._ajaxPost({
                url: '/vertex/removeRelationship',
                data: {
                    sourceId: sourceId,
                    targetId: targetId,
                    label: label
                }
            });
        };

        VertexService.prototype.getVertexToVertexRelationshipDetails = function (source, target, label) {
            return this._ajaxGet({
                url: 'vertex/relationship',
                data: {
                    source: source,
                    target: target,
                    label: label
                }
            });
        };

        VertexService.prototype.findPath = function(data) {
            return this._ajaxGet({
                url: 'graph/findPath',
                data: data
            });
        };

        VertexService.prototype.locationSearch = function(lat, lon, radiuskm) {
            return this._ajaxGet({
                url: 'graph/vertex/geoLocationSearch',
                data: {
                    lat: lat,
                    lon: lon,
                    radius: radiuskm
                }
            });
        };

        VertexService.prototype.getStatementByRowKey = function(statementRowKey) {
            return this._get("statement", statementRowKey);
        };

        VertexService.prototype.artifactSearch = function(query, filters, subType, paging) {
            if (typeof filters === 'function') {
                callback = filters;
                filters = [];
            }

            var parameters = {
                q: query.query || query,
                filter: JSON.stringify(filters || [])
            };

            if (subType) {
                parameters.subType = subType;
            }

            if (paging) {
                if (paging.offset) parameters.offset = paging.offset;
                if (paging.size) parameters.size = paging.size;
            }

            return this._ajaxGet({
                url: 'artifact/search',
                data: parameters
            });
        };

        VertexService.prototype.getArtifactById = function (id) {
            return this._get("artifact", id);
        };

        VertexService.prototype.getArtifactHighlightedTextById = function(graphVertexId) {
            return this._ajaxGet({
                dataType: 'html',
                url: "artifact/" + graphVertexId + "/highlightedText"
            });
        };

        VertexService.prototype.getRawArtifactById = function (id) {
            //maybe it's an object for future options stuff?
            var i = typeof id == "object" ? id.id : id;

            return this._ajaxGet({
                url: "artifact/" + i + "/raw",
            });
        };

        VertexService.prototype.graphVertexSearch = function (query, filters, subType, paging) {
            if (typeof filters === 'function') {
                callback = filters;
                filters = [];
            }

            var data = {};

            if (subType) data.subType = subType;
            if (paging) {
                if (paging.offset) data.offset = paging.offset;
                if (paging.size) data.size = paging.size;
            }

            data.q = query.query || query;
            data.filter = JSON.stringify(filters || []);

            return this._ajaxGet({ 
                url: 'graph/vertex/search',
                data: data
            });
        };

        VertexService.prototype.getRelatedVertices = function(data) {
            return this._ajaxGet({
                url: 'graph/' + encodeURIComponent(data.graphVertexId) + '/relatedVertices',
                data: {
                    limitParentConceptId: data.limitParentConceptId
                }
            });
        };

        VertexService.prototype.getVertexRelationships = function(graphVertexId, paging) {
            return this._ajaxGet({
                url: 'vertex/' + graphVertexId + '/relationships',
                data: paging || {}
            });
        };

        VertexService.prototype.getVertexProperties = function(graphVertexId) {
            return this._ajaxGet({ url: 'vertex/' + graphVertexId + '/properties'});
        };

        VertexService.prototype._search = function (resource, query) {
            //maybe it's an object for future options stuff?
            var q = typeof query == "object" ? query.query : query;
            var url = resource + "/search";

            return this._ajaxGet({
                url: url,
                data: {
                    'q' : q
                }
            });
        };

        VertexService.prototype._get = function (resource, id) {
            if(!id) {
                throw new Error("Invalid or no id specified for resource '" + resource + "'");
            }

            //maybe it's an object for future options stuff?
            var i = encodeURIComponent(typeof id == "object" ? id.id : id);
            return this._ajaxGet({
                url: resource + "/" + i,
            });
        };

        VertexService.prototype.createTerm = function(createRequest) {
            return this._ajaxPost({
                url: 'entity/createTerm',
                data: createRequest
            });
        };

        VertexService.prototype.updateTerm = function(updateRequest) {
            return this._ajaxPost({
                url: 'entity/updateTerm',
                data: updateRequest
            });
        };

        VertexService.prototype.resolveDetectedObject = function(createRequest) {
            return this._ajaxPost({
                url: 'entity/createResolvedDetectedObject',
                data: createRequest
            });
        };

        VertexService.prototype.updateDetectedObject = function(updateRequest) {
            return this._ajaxPost({
                url: 'entity/updateResolvedDetectedObject',
                data: updateRequest
            });
        };

        VertexService.prototype.deleteDetectedObject = function(deleteRequest) {
            return this._ajaxPost({
                url: 'entity/deleteResolvedDetectedObject',
                data: deleteRequest
            });
        };

        return VertexService;
    });

